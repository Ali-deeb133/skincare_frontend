import React, { useState } from 'react';
import ProductCard from '../../../components/shared/ProductCard';
import type { Product } from '../../../types/product.types';

interface Props {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const gridClass = 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5';
const ITEMS_PER_PAGE = 20;

const SearchResults: React.FC<Props> = ({ products, loading, error, totalCount }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // A new result list (new search or filter) starts again from page 1.
  const [shownProducts, setShownProducts] = useState(products);
  if (products !== shownProducts) {
    setShownProducts(products);
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-[rgba(240,174,207,0.3)] overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-[rgba(248,215,232,0.4)]" />
            <div className="p-4 space-y-2">
              <div className="h-3 bg-[rgba(248,215,232,0.5)] rounded-full w-3/4" />
              <div className="h-3 bg-[rgba(248,215,232,0.35)] rounded-full w-1/2" />
              <div className="h-5 bg-[rgba(248,215,232,0.4)] rounded-full w-1/3 mt-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-4xl mb-4">😕</span>
        <p role="alert" className="text-sakura-muted text-sm">
          {error}
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">🔍</span>
        <h3 className="text-sakura-ink font-bold mb-1">No Results Found</h3>
        <p className="text-sakura-muted text-sm">
          Try changing the filters or searching for a different term
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-sakura-muted mb-4">
        Showing{' '}
        <span className="font-bold text-sakura-dark">
          {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
          {Math.min(currentPage * ITEMS_PER_PAGE, products.length)}
        </span>{' '}
        of <span className="font-bold text-sakura-dark">{totalCount}</span> products
      </p>

      <div className={gridClass}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            aria-label="Previous page"
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl border border-[rgba(240,174,207,0.45)] text-sakura-muted disabled:opacity-30 hover:border-sakura-accent hover:text-sakura-dark transition-all"
          >
            ←
          </button>

          <span className="text-sm text-sakura-muted px-2">
            <span className="font-bold text-sakura-dark">{currentPage}</span> / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            aria-label="Next page"
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl border border-[rgba(240,174,207,0.45)] text-sakura-muted disabled:opacity-30 hover:border-sakura-accent hover:text-sakura-dark transition-all"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
