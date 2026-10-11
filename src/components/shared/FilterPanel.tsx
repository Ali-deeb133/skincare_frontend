import React, { useState } from 'react';
import { useSearchStore } from '../../store/searchStore';
import type { SortOrder } from '../../types/product.types';
import { PRODUCT_TYPES } from '../../utils/productTypes';

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'price', label: '↑ Ascending' },
  { value: '-price', label: '↓ Descending' },
];

const FilterPanel: React.FC = () => {
  const { filters, setProductType, setPriceRange, setOrdering, resetFilters } = useSearchStore();

  const [minPrice, setMinPrice] = useState<number | undefined>(filters.price__gte ?? undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(filters.price__lte ?? undefined);

  // When the price filter is changed from outside (its chip is removed,
  // "Clear All"), show the new values in the inputs.
  const [syncedMin, setSyncedMin] = useState(filters.price__gte);
  const [syncedMax, setSyncedMax] = useState(filters.price__lte);
  if (filters.price__gte !== syncedMin || filters.price__lte !== syncedMax) {
    setSyncedMin(filters.price__gte);
    setSyncedMax(filters.price__lte);
    setMinPrice(filters.price__gte);
    setMaxPrice(filters.price__lte);
  }

  const applyPrice = () => {
    setPriceRange(minPrice, maxPrice);
  };

  const activeCount = [
    filters.search,
    filters.product_type !== 'All' ? filters.product_type : '',
    filters.price__gte,
    filters.price__lte,
    filters.ordering,
  ].filter(Boolean).length;

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-2 shadow-[0_10px_40px_rgba(224,122,171,0.15)] space-y-6 transition-all duration-300 hover:shadow-[0_15px_50px_rgba(224,122,171,0.25)]">
      {/* Glow effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-sakura-accent/20 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-sakura-ink flex items-center gap-2">
          🎛️ Filters
          {activeCount > 0 && (
            <span className="bg-gradient-to-r from-sakura-accent to-sakura-dark text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {activeCount}
            </span>
          )}
        </span>

        {activeCount > 0 && (
          <button
            onClick={() => {
              resetFilters();
              setMinPrice(undefined);
              setMaxPrice(undefined);
            }}
            className="text-xs text-sakura-muted hover:text-sakura-dark transition-all duration-200 hover:scale-105"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Brand Filter */}
      <div>
        <p className="text-xs font-semibold text-sakura-muted mb-2 tracking-wide uppercase">
          Product Type
        </p>

        <div className="flex flex-wrap gap-2">
          {PRODUCT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setProductType(type)}
              className={`
                relative overflow-hidden text-xs px-4 py-1.5 rounded-full border font-medium transition-all duration-300
                active:scale-95
                ${
                  filters.product_type === type
                    ? 'bg-gradient-to-r from-sakura-accent to-sakura-dark text-white border-transparent shadow-[0_4px_15px_rgba(192,80,138,0.35)] scale-105'
                    : 'bg-white/70 border-[rgba(240,174,207,0.45)] text-sakura-muted hover:border-sakura-accent hover:text-sakura-dark hover:scale-105'
                }
              `}
            >
              {type === 'All' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold text-sakura-muted mb-2 tracking-wide uppercase">
          Price Range($)
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            applyPrice();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="number"
            value={minPrice ?? ''}
            onChange={(e) =>
              setMinPrice(e.target.value === '' ? undefined : Number(e.target.value))
            }
            placeholder="from"
            min={0}
            className="w-20 text-center text-sm border border-transparent rounded-xl py-2 bg-sakura-base text-sakura-ink outline-none focus:ring-2 focus:ring-sakura-accent transition-all duration-200 focus:scale-105"
          />

          <span className="text-sakura-muted text-sm">—</span>

          <input
            type="number"
            value={maxPrice ?? ''}
            onChange={(e) =>
              setMaxPrice(e.target.value === '' ? undefined : Number(e.target.value))
            }
            placeholder="to"
            min={0}
            className="w-20 text-center text-sm border border-transparent rounded-xl py-2 bg-sakura-base text-sakura-ink outline-none focus:ring-2 focus:ring-sakura-accent transition-all duration-200 focus:scale-105"
          />

          <button
            type="submit"
            className="flex-1 text-xs font-semibold bg-gradient-to-r from-sakura-mid to-[#f3b6d2] border border-[rgba(240,174,207,0.5)] text-sakura-dark rounded-xl py-2 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
          >
            Apply
          </button>
        </form>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-sakura-muted mb-2 tracking-wide uppercase">
          Ordering
        </p>

        <div className="flex gap-2">
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setOrdering(filters.ordering === value ? undefined : value)}
              className={`
                flex-1 text-xs font-semibold py-2 rounded-xl border transition-all duration-300
                active:scale-95
                ${
                  filters.ordering === value
                    ? 'bg-gradient-to-r from-sakura-accent to-sakura-dark text-white border-transparent shadow-[0_4px_15px_rgba(192,80,138,0.3)] scale-105'
                    : 'bg-white/70 border-[rgba(240,174,207,0.45)] text-sakura-muted hover:border-sakura-accent hover:text-sakura-dark hover:scale-105'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
