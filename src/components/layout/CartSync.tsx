import { useEffect } from 'react';
import useCartStore from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import Toast from '../ui/Toast';
import { useSlowServerHint } from '../../hooks/useSlowServerHint';

const TOAST_DURATION = 3000;
const ERROR_DURATION = 5000;

// Mounted once in the Layout. Keeps the cart in step with the logged-in user
// and shows cart messages on every page.
export const CartSync = () => {
  const userId = useAuthStore((state) => state.user?.id);

  const toastMessage = useCartStore((state) => state.toastMessage);
  const error = useCartStore((state) => state.error);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const resetCart = useCartStore((state) => state.resetCart);
  const clearToast = useCartStore((state) => state.clearToast);
  const clearError = useCartStore((state) => state.clearError);
  const isCartLoading = useCartStore((state) => state.loadingAction !== null);

  // Tracked here, not in useCart, which runs once per product card.
  useSlowServerHint(isCartLoading);

  // Load the cart on page load and login; empty it on logout.
  useEffect(() => {
    if (userId !== undefined) {
      fetchCart();
    } else {
      resetCart();
    }
  }, [userId, fetchCart, resetCart]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(clearToast, TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [toastMessage, clearToast]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(clearError, ERROR_DURATION);
    return () => clearTimeout(timer);
  }, [error, clearError]);

  if (error) return <Toast message={error} variant="error" />;

  return <Toast message={toastMessage} />;
};
