import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useSearchStore } from '../store/searchStore';
import type { Product } from '../types/product.types';

// Accepts both a plain array and a paginated `{ results: [...] }` response.
const toProductList = (data: unknown): Product[] => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && 'results' in data) {
    const { results } = data as { results: unknown };
    if (Array.isArray(results)) return results;
  }
  return [];
};

interface ProductsResult {
  key: string;
  products: Product[];
  error: string | null;
}

export const useProducts = () => {
  const { filters } = useSearchStore();
  const key = JSON.stringify(filters);

  // `key` records which filters the stored result belongs to, so a result is
  // only shown for the filters that produced it.
  const [result, setResult] = useState<ProductsResult>({ key: '', products: [], error: null });

  useEffect(() => {
    let cancelled = false;

    productService
      .getProducts(filters)
      .then((res) => {
        if (!cancelled) setResult({ key, products: toProductList(res.data), error: null });
      })
      .catch(() => {
        if (!cancelled)
          setResult({
            key,
            products: [],
            error: 'Could not load products. Please check your connection and try again.',
          });
      });

    return () => {
      cancelled = true;
    };
  }, [filters, key]);

  const loading = result.key !== key;

  return {
    products: result.products,
    loading,
    error: loading ? null : result.error,
  };
};

interface ProductResult {
  id: string;
  product: Product | null;
}

// Loads one product by id. `initialProduct` is the product passed along by
// the link that opened the page; when it matches, no request is needed.
// The API has no single-product endpoint (/api/products/<id>/ is a 404), so
// the fallback loads the unfiltered list and picks the product from it.
export const useProduct = (id: string | undefined, initialProduct?: Product) => {
  const initial = initialProduct && String(initialProduct.id) === id ? initialProduct : undefined;

  const [result, setResult] = useState<ProductResult | null>(null);

  useEffect(() => {
    if (initial || !id) return;

    let cancelled = false;

    productService
      .getProducts({})
      .then((res) => {
        const product = toProductList(res.data).find((p) => String(p.id) === id) ?? null;
        if (!cancelled) setResult({ id, product });
      })
      .catch(() => {
        if (!cancelled) setResult({ id, product: null });
      });

    return () => {
      cancelled = true;
    };
  }, [id, initial]);

  const fetched = result?.id === id ? result : null;

  return {
    product: initial ?? fetched?.product ?? null,
    loading: Boolean(id) && !initial && !fetched,
  };
};
