import api from './api';
import type {
  Cart,
  AddToCartPayload,
  UpdateCartPayload,
  RemoveFromCartPayload,
  CartErrorResponse,
} from '../types/cart.types';
import axios from 'axios';

const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as CartErrorResponse;

    if (!data) return 'Could not reach the server. Please try again.';

    if ('detail' in data && data.detail) return data.detail;
    if ('message' in data && data.message) return data.message;

    return 'Something went wrong';
  }

  return 'Network error';
};

// The API may send prices as strings (e.g. "12.50"); the UI does maths on
// them, so convert once here.
const toNumber = (value: unknown): number => Number(value) || 0;

// ✅ helper يستخرج الـ cart من أي شكل response
// سواء رجع { cart: {...} } أو Cart مباشرة
const extractCart = (data: unknown): Cart => {
  const raw =
    data && typeof data === 'object' && 'cart' in data
      ? (data as { cart: Cart }).cart
      : (data as Cart);

  return {
    ...raw,
    total_price: toNumber(raw?.total_price),
    items: (raw?.items ?? []).map((item) => ({
      ...item,
      total_price: toNumber(item.total_price),
      product: { ...item.product, price: toNumber(item.product?.price) },
    })),
  };
};

const CartService = {
  getCart: async (): Promise<Cart> => {
    try {
      const response = await api.get('/api/cart/');
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error), { cause: error });
    }
  },

  addToCart: async (payload: AddToCartPayload): Promise<Cart> => {
    try {
      const response = await api.post('/api/cart/add/', payload);
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error), { cause: error });
    }
  },

  updateCart: async (payload: UpdateCartPayload): Promise<Cart> => {
    try {
      const response = await api.post('/api/cart/update/', payload);
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error), { cause: error });
    }
  },

  removeFromCart: async (payload: RemoveFromCartPayload): Promise<Cart> => {
    try {
      const response = await api.post('/api/cart/remove/', payload);
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error), { cause: error });
    }
  },

  clearCart: async (): Promise<Cart> => {
    try {
      const response = await api.post('/api/cart/clear/');
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error), { cause: error });
    }
  },
};

export default CartService;
