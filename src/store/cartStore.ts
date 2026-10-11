import { create } from 'zustand';
import CartService from '../services/cartService';
import type {
  CartState,
  AddToCartPayload,
  UpdateCartPayload,
  RemoveFromCartPayload,
} from '../types/cart.types';

// Every action resolves to true on success and false on failure, so callers
// can react (e.g. only show "added" when it really was added).
interface CartStore extends CartState {
  loadingProductId: number | undefined;
  fetchError: string | null;
  fetchCart: () => Promise<boolean>;
  addToCart: (payload: AddToCartPayload) => Promise<boolean>;
  updateCart: (payload: UpdateCartPayload) => Promise<boolean>;
  removeFromCart: (payload: RemoveFromCartPayload) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  resetCart: () => void;
  clearToast: () => void;
  clearError: () => void;
}

const getErrorMessage = (e: unknown): string => {
  if (e instanceof Error) return e.message;
  return 'An unexpected error occurred';
};

const initialState = {
  cart: null,
  loadingAction: null,
  loadingItemId: undefined,
  loadingProductId: undefined,
  error: null,
  fetchError: null,
  toastMessage: null,
};

const useCartStore = create<CartStore>((set) => ({
  // ---- Initial State ----
  ...initialState,

  // ---- Fetch Cart ----
  fetchCart: async () => {
    set({ loadingAction: 'fetch', fetchError: null });
    try {
      const cart = await CartService.getCart();
      set({ cart, loadingAction: null });
      return true;
    } catch (e: unknown) {
      set({ fetchError: getErrorMessage(e), loadingAction: null });
      return false;
    }
  },

  // ---- Add to Cart ----
  addToCart: async (payload) => {
    set({ loadingAction: 'add', loadingProductId: payload.product_id, error: null });
    try {
      const cart = await CartService.addToCart(payload);
      set({
        cart,
        loadingAction: null,
        loadingProductId: undefined,
        toastMessage: 'Item added to cart 🌸',
      });
      return true;
    } catch (e: unknown) {
      set({ error: getErrorMessage(e), loadingAction: null, loadingProductId: undefined });
      return false;
    }
  },

  // ---- Update Quantity ----
  updateCart: async (payload) => {
    set({
      loadingAction: 'update',
      loadingItemId: payload.item_id,
      error: null,
    });
    try {
      const cart = await CartService.updateCart(payload);
      set({ cart, loadingAction: null, loadingItemId: undefined });
      return true;
    } catch (e: unknown) {
      set({ error: getErrorMessage(e), loadingAction: null, loadingItemId: undefined });
      return false;
    }
  },

  // ---- Remove Item ----
  removeFromCart: async (payload) => {
    set({ loadingAction: 'remove', loadingItemId: payload.item_id, error: null });
    try {
      const cart = await CartService.removeFromCart(payload);
      set({
        cart,
        loadingAction: null,
        loadingItemId: undefined,
        toastMessage: 'Item removed from cart.',
      });
      return true;
    } catch (e: unknown) {
      set({ error: getErrorMessage(e), loadingAction: null, loadingItemId: undefined });
      return false;
    }
  },

  // ---- Clear Cart ----
  clearCart: async () => {
    set({ loadingAction: 'clear', error: null });
    try {
      const cart = await CartService.clearCart();
      set({ cart, loadingAction: null, toastMessage: 'Cart cleared.' });
      return true;
    } catch (e: unknown) {
      set({ error: getErrorMessage(e), loadingAction: null });
      return false;
    }
  },

  // ---- Reset (used on logout) ----
  resetCart: () => set(initialState),

  // ---- UI Helpers ----
  clearToast: () => set({ toastMessage: null }),
  clearError: () => set({ error: null }),
}));

export default useCartStore;
