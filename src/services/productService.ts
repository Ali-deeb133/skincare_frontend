
import api from './api';
import type { ProductFilters } from '../types/Product.type';

export const productService = {
  getProducts: (filters: Partial<ProductFilters>) => {
    const params = new URLSearchParams();

    if (filters.search)
      params.set('search', filters.search);

    if (filters.product_type && filters.product_type !== 'All')
      params.set('product_type', filters.product_type);

    if (filters.price__gte !== undefined)
      params.set('price__gte', String(filters.price__gte));

    if (filters.price__lte !== undefined)
      params.set('price__lte', String(filters.price__lte));

    if (filters.ordering)
      params.set('ordering', filters.ordering);

    return api.get(`/api/products/?${params.toString()}`);
  },

  getProductById: (id: number) =>
    api.get(`/api/products/${id}/`),

  getBrands: () =>
    api.get('/api/brands/'),
};