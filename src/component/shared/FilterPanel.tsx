
import React, { useState } from 'react';
import { useSearchStore } from '../../store/searchStore';
import type { SortOrder } from '../../types/Product.type';
import { PRODUCT_TYPES } from '../../utils/categories';

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'price', label: '↑ Ascending' },
  { value: '-price', label: '↓ Descending' },
];

const FilterPanel: React.FC = () => {
  const { filters, setProductType, setPriceRange, setOrdering, resetFilters } = useSearchStore();

  const [minPrice, setMinPrice] = useState<number | undefined>(filters.price__gte ?? undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(filters.price__lte ?? undefined);

  // useEffect(() => {
  //   setMinPrice(filters.price__gte ?? undefined);
  //   setMaxPrice(filters.price__lte ?? undefined);
  // }, [filters.price__gte, filters.price__lte]);

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
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#e07aab]/20 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#2d1a28] flex items-center gap-2">
          🎛️ Filters
          {activeCount > 0 && (
            <span className="bg-gradient-to-r from-[#e07aab] to-[#c0508a] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
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
            className="text-xs text-[#9e6e8a] hover:text-[#c0508a] transition-all duration-200 hover:scale-105"
          >
           Clear All
          </button>
        )}
      </div>

      {/* Brand Filter */}
      <div>
        <p className="text-xs font-semibold text-[#9e6e8a] mb-2 tracking-wide uppercase">
         Brand
        </p>

        <div className="flex flex-wrap gap-2">
          {PRODUCT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setProductType(type)}
              className={`
                relative overflow-hidden text-xs px-4 py-1.5 rounded-full border font-medium transition-all duration-300
                active:scale-95
                ${filters.product_type === type
                  ? 'bg-gradient-to-r from-[#e07aab] to-[#c0508a] text-white border-transparent shadow-[0_4px_15px_rgba(192,80,138,0.35)] scale-105'
                  : 'bg-white/70 border-[rgba(240,174,207,0.45)] text-[#9e6e8a] hover:border-[#e07aab] hover:text-[#c0508a] hover:scale-105'}
              `}
            >
              {type === 'All' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold text-[#9e6e8a] mb-2 tracking-wide uppercase">
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
            onChange={(e) => setMinPrice(e.target.value === '' ? undefined : Number(e.target.value))}
            placeholder="from"
            min={0}
            className="w-20 text-center text-sm border border-transparent rounded-xl py-2 bg-[#fdf0f5] text-[#2d1a28] outline-none focus:ring-2 focus:ring-[#e07aab] transition-all duration-200 focus:scale-105"
          />

          <span className="text-[#9e6e8a] text-sm">—</span>

          <input
            type="number"
            value={maxPrice ?? ''}
            onChange={(e) => setMaxPrice(e.target.value === '' ? undefined : Number(e.target.value))}
            placeholder="to"
            min={0}
            className="w-20 text-center text-sm border border-transparent rounded-xl py-2 bg-[#fdf0f5] text-[#2d1a28] outline-none focus:ring-2 focus:ring-[#e07aab] transition-all duration-200 focus:scale-105"
          />

          <button
            type="submit"
            className="flex-1 text-xs font-semibold bg-gradient-to-r from-[#f8d7e8] to-[#f3b6d2] border border-[rgba(240,174,207,0.5)] text-[#c0508a] rounded-xl py-2 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
          >
            Apply
          </button>
        </form>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-[#9e6e8a] mb-2 tracking-wide uppercase">
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
                ${filters.ordering === value
                  ? 'bg-gradient-to-r from-[#e07aab] to-[#c0508a] text-white border-transparent shadow-[0_4px_15px_rgba(192,80,138,0.3)] scale-105'
                  : 'bg-white/70 border-[rgba(240,174,207,0.45)] text-[#9e6e8a] hover:border-[#e07aab] hover:text-[#c0508a] hover:scale-105'}
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












