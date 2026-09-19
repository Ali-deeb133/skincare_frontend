// import { create } from "zustand";
// import CartService from "../services/CartService";
// import type {
//   CartState,
//   AddToCartPayload,
//   UpdateCartPayload,
//   RemoveFromCartPayload,
// } from "../types/Cart.type";

// interface CartStore extends CartState {
//   fetchCart: () => Promise<void>;
//   addToCart: (payload: AddToCartPayload) => Promise<void>;
//   updateCart: (payload: UpdateCartPayload) => Promise<void>;
//   removeFromCart: (payload: RemoveFromCartPayload) => Promise<void>;
//   clearCart: () => Promise<void>;
//   clearToast: () => void;
//   clearError: () => void;
// }

// const getErrorMessage = (e: unknown): string => {
//   if (e instanceof Error) return e.message;
//   return "An unexpected error occurred";
// };

// const useCartStore = create<CartStore>((set) => ({
//   // ---- Initial State ----
//   cart: null,
//   loadingAction: null,
//   loadingItemId: undefined,
//   error: null,
//   toastMessage: null,
  

//   // ---- Fetch Cart ----
//   fetchCart: async () => {
//     set({ loadingAction: "fetch", error: null });
//     try {
//       const cart = await CartService.getCart();
//       set({ cart, loadingAction: null });
//     } catch (e: unknown) {
//       set({ error: getErrorMessage(e), loadingAction: null });
//     }
//   },

//   // ---- Add to Cart ----
//   addToCart: async (payload) => {
//     set({ loadingAction: "add", error: null });
//     try {
//       const cart = await CartService.addToCart(payload);

//       set({
//         cart,
//         loadingAction: null,
//         toastMessage: "Item added to cart 🌸",
//       });
//     } catch (e: unknown) {
//       set({ error: getErrorMessage(e), loadingAction: null });
//     }
//   },

//   // ---- Update Quantity ----
//   updateCart: async (payload) => {
//     set({
//       loadingAction: "update",
//       loadingItemId: payload.item_id,
//       error: null,
//     });

//     try {
//       const cart = await CartService.updateCart(payload);
//       console.log("🛒 updateCart response:", JSON.stringify(cart))

//       set({
//         cart,
//         loadingAction: null,
//         loadingItemId: undefined,
//       });
//     } catch (e: unknown) {
//       set({
//         error: getErrorMessage(e),
//         loadingAction: null,
//         loadingItemId: undefined,
//       });
//     }
//   },

//   // ---- Remove Item ----
//   removeFromCart: async (payload) => {
//     set({
//       loadingAction: "remove",
//       loadingItemId: payload.item_id,
//       error: null,
//     });

//     try {
//       const cart = await CartService.removeFromCart(payload);

//       set({
//         cart,
//         loadingAction: null,
//         loadingItemId: undefined,
//         toastMessage: "Item removed from cart.",
//       });
//     } catch (e: unknown) {
//       set({
//         error: getErrorMessage(e),
//         loadingAction: null,
//         loadingItemId: undefined,
//       });
//     }
//   },

//   // ---- Clear Cart ----
//   clearCart: async () => {
//     set({ loadingAction: "clear", error: null });

//     try {
//       const cart = await CartService.clearCart();

//       set({
//         cart,
//         loadingAction: null,
//         toastMessage: "Cart cleared.",
//       });
//     } catch (e: unknown) {
//       set({ error: getErrorMessage(e), loadingAction: null });
//     }
//   },

//   // ---- UI Helpers ----
//   clearToast: () => set({ toastMessage: null }),
//   clearError: () => set({ error: null }),
// }));

// export default useCartStore;






import { create } from "zustand";
import CartService from "../services/CartService";
import type {
  CartState,
  AddToCartPayload,
  UpdateCartPayload,
  RemoveFromCartPayload,
} from "../types/Cart.type";

interface CartStore extends CartState {
  loadingProductId: number | undefined;
  fetchCart: () => Promise<void>;
  addToCart: (payload: AddToCartPayload) => Promise<void>;
  updateCart: (payload: UpdateCartPayload) => Promise<void>;
  removeFromCart: (payload: RemoveFromCartPayload) => Promise<void>;
  clearCart: () => Promise<void>;
  clearToast: () => void;
  clearError: () => void;
}

const getErrorMessage = (e: unknown): string => {
  if (e instanceof Error) return e.message;
  return "An unexpected error occurred";
};

const useCartStore = create<CartStore>((set) => ({
  // ---- Initial State ----
  cart: null,
  loadingAction: null,
  loadingItemId: undefined,
  loadingProductId: undefined, // ✅ جديد
  error: null,
  toastMessage: null,

  // ---- Fetch Cart ----
  fetchCart: async () => {
    set({ loadingAction: "fetch", error: null });
    try {
      const cart = await CartService.getCart();
      set({ cart, loadingAction: null });
    } catch (e: unknown) {
      set({ error: getErrorMessage(e), loadingAction: null });
    }
  },

  // ---- Add to Cart ----
  addToCart: async (payload) => {
    set({ loadingAction: "add", loadingProductId: payload.product_id, error: null }); // ✅
    try {
      const cart = await CartService.addToCart(payload);
      set({
        cart,
        loadingAction: null,
        loadingProductId: undefined, // ✅
        toastMessage: "Item added to cart 🌸",
      });
    } catch (e: unknown) {
      set({ error: getErrorMessage(e), loadingAction: null, loadingProductId: undefined }); // ✅
    }
  },

  // ---- Update Quantity ----
  updateCart: async (payload) => {
    set({
      loadingAction: "update",
      loadingItemId: payload.item_id,
      error: null,
    });
    try {
      const cart = await CartService.updateCart(payload);
      set({ cart, loadingAction: null, loadingItemId: undefined });
    } catch (e: unknown) {
      set({ error: getErrorMessage(e), loadingAction: null, loadingItemId: undefined });
    }
  },

  // ---- Remove Item ----
  removeFromCart: async (payload) => {
    set({ loadingAction: "remove", loadingItemId: payload.item_id, error: null });
    try {
      const cart = await CartService.removeFromCart(payload);
      set({
        cart,
        loadingAction: null,
        loadingItemId: undefined,
        toastMessage: "Item removed from cart.",
      });
    } catch (e: unknown) {
      set({ error: getErrorMessage(e), loadingAction: null, loadingItemId: undefined });
    }
  },

  // ---- Clear Cart ----
  clearCart: async () => {
    set({ loadingAction: "clear", error: null });
    try {
      const cart = await CartService.clearCart();
      set({ cart, loadingAction: null, toastMessage: "Cart cleared." });
    } catch (e: unknown) {
      set({ error: getErrorMessage(e), loadingAction: null });
    }
  },

  // ---- UI Helpers ----
  clearToast: () => set({ toastMessage: null }),
  clearError: () => set({ error: null }),
}));

export default useCartStore;

