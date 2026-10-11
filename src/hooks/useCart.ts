import { useCallback } from 'react';
import useCartStore from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import type { AddToCartPayload } from '../types/cart.types';

const useCart = () => {
  const {
    cart,
    loadingAction,
    loadingItemId,
    loadingProductId,
    error,
    fetchError,
    fetchCart,
    addToCart: addToCartRequest,
    updateCart,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const user = useAuthStore((state) => state.user);
  const openDropdown = useAuthStore((state) => state.openDropdown);

  // ---- Auth Guard ----
  // The cart lives on the server, so a guest is asked to log in instead of
  // sending a request that can only fail.
  const addToCart = useCallback(
    async (payload: AddToCartPayload): Promise<boolean> => {
      if (!user) {
        openDropdown('login');
        return false;
      }

      return addToCartRequest(payload);
    },
    [user, openDropdown, addToCartRequest]
  );

  // ---- Computed Values ----
  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const totalPrice = cart?.total_price ?? 0;
  const isEmpty = !cart || cart.items.length === 0;
  const isLoading = loadingAction !== null;

  // ---- Smart Loading Helpers ----
  const isUpdatingItem = (itemId: number) => loadingAction === 'update' && loadingItemId === itemId;

  const isRemovingItem = (itemId: number) => loadingAction === 'remove' && loadingItemId === itemId;

  const isAddingProduct = (productId: number) =>
    loadingAction === 'add' && loadingProductId === productId;

  return {
    // State
    cart,
    loadingAction,
    loadingItemId,
    loadingProductId,
    error,
    fetchError,
    user,

    // Computed
    itemCount,
    totalPrice,
    isEmpty,
    isLoading,

    // Smart UI helpers
    isUpdatingItem,
    isRemovingItem,
    isAddingProduct,

    // Actions
    fetchCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
  };
};

export default useCart;
