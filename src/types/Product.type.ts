// product.types.ts

export interface Product {
  id: number;
  product_name: string;
  product_type: string;
  clean_ingreds: string;
  price: number;
  url: string;
  image: string| null;

}

export interface ProductFilters {
  search?: string;
  product_type?: string;
  price__gte?: number;
  price__lte?: number;
  ordering?: 'price' | '-price';
}

export type SortOrder = 'price' | '-price';