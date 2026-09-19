


import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { useSearchStore } from '../store/searchStore';
import type { Product } from '../types/Product.type';

export const useProducts = () => {
  const { filters } = useSearchStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getProducts(filters);
      setProducts(res.data);
    } catch {
      setError('فشل تحميل المنتجات. تأكد من اتصالك بالخادم.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchProductById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getProductById(id);
      setSelectedProduct(res.data);
    } catch {
      setError('فشل تحميل تفاصيل المنتج.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    selectedProduct,
    loading,
    error,
    refetch: fetchProducts,
    fetchProductById,
  };
};