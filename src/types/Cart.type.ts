export interface CartProduct {
  id: number;
  product_name: string;
  product_type: string;
  clean_ingreds: string;
  price: number;
  url: string;
}

export interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  total_price: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total_price: number;
}

// Payloads

export type CartActionType = "increase" | "decrease";

export interface AddToCartPayload {
  product_id: number;
  quantity: number;
}

export interface UpdateCartPayload {
  item_id: number;
  action: CartActionType;
}

export interface RemoveFromCartPayload {
  item_id: number;
}

// Responses

export type CartApiResponse = Cart;

export interface CartErrorResponse {
  message?: string;
  detail?: string;
}

// UI State

export type CartLoadingAction =
  | "fetch"
  | "add"
  | "update"
  | "remove"
  | "clear"
  | null;

export interface CartState {
  cart: Cart | null;
  loadingAction: CartLoadingAction;
  loadingItemId?: number;
  error: string | null;
  toastMessage: string | null;
}