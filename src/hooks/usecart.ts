import { useEffect, useCallback } from "react";
import useCartStore from "../store/CartStore";
import {useAuthStore} from "../store/authStore";

const useCart = () => {
  const {
    cart,
    loadingAction,
    loadingItemId,
    loadingProductId,
    error,
    toastMessage,
    fetchCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    clearToast,
    clearError,
  } = useCartStore();

  const { user } = useAuthStore();

  // ---- Auto-fetch ----
  // useEffect(() => {
  //   if (user) {
  //     fetchCart();
  //   }
  // }, [user,fetchCart]);

  // ---- Auto-clear toast ----
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => clearToast(), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  // ---- Auth Guard (Async-ready) ----
  const requireAuth = useCallback(
    async (action: () => Promise<void> | void): Promise<boolean> => {
      if (!user) return false;

      await action();
      return true;
    },
    [user]
  );

  // ---- Computed Values ----
  const itemCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const totalPrice = cart?.total_price ?? 0;
  const isEmpty = !cart || cart.items.length === 0;
  const isLoading = loadingAction !== null;

  // ---- Smart Loading Helpers ----
  const isUpdatingItem = (itemId: number) =>
    loadingAction === "update" && loadingItemId === itemId;

  const isRemovingItem = (itemId: number) =>
    loadingAction === "remove" && loadingItemId === itemId;

  const isAddingProduct = (productId: number) =>
  loadingAction === "add" && loadingProductId === productId;

  return {
    // State
    cart,
    loadingAction,
    loadingItemId,
    loadingProductId,
    error,
    toastMessage,
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
    requireAuth,

    // UI helpers
    clearToast,
    clearError,
  };
};

export default useCart;


