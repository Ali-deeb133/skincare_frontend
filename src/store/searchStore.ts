import { create } from 'zustand';
import type { ProductFilters, SortOrder } from '../types/Product.type';

interface SearchState {
  filters: ProductFilters;

  setSearch: (search: string) => void;
  setProductType: (type?: string) => void;
  setPriceRange: (gte?: number, lte?: number) => void;
  setOrdering: (order?: SortOrder) => void;

  resetFilters: () => void;
}

const defaultFilters: ProductFilters = {
  search: '',
};

export const useSearchStore = create<SearchState>((set) => ({
  filters: defaultFilters,

  setSearch: (search) =>
    set((s) => ({
      filters: { ...s.filters, search }
    })),

  setProductType: (product_type) =>
    set((s) => ({
      filters: { ...s.filters, product_type }
    })),

  setPriceRange: (price__gte, price__lte) =>
    set((s) => ({
      filters: { ...s.filters, price__gte, price__lte }
    })),

  setOrdering: (ordering) =>
    set((s) => ({
      filters: { ...s.filters, ordering }
    })),

  resetFilters: () =>
    set({ filters: defaultFilters }),
}));