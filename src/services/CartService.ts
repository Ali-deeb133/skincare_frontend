// import api from "./api";
// import type {
//   Cart,
//   AddToCartPayload,
//   UpdateCartPayload,
//   RemoveFromCartPayload,
//   CartErrorResponse,
// } from "../types/Cart.type";
// import axios from "axios";

// const handleError = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     const data = error.response?.data as CartErrorResponse;

//     if (!data) return "Unknown error";

//     if ("detail" in data && data.detail) return data.detail;
//     if ("message" in data && data.message) return data.message;

//     return "Something went wrong";
//   }

//   return "Network error";
// };

// const CartService = {
//   getCart: async (): Promise<Cart> => {
//     try {
//       const response = await api.get<Cart>("/api/cart/");
//       return response.data;
//     } catch (error) {
//       throw new Error(handleError(error));
//     }
//   },

//   addToCart: async (payload: AddToCartPayload): Promise<Cart> => {
//     try {
//       const response = await api.post<Cart>("/api/cart/add/", payload);
//       return response.data;
//     } catch (error) {
//       throw new Error(handleError(error));
//     }
//   },

//   updateCart: async (payload: UpdateCartPayload): Promise<Cart> => {
//     try {
//       const response = await api.post<Cart>("/api/cart/update/", payload);
//       return response.data;
//     } catch (error) {
//       throw new Error(handleError(error));
//     }
//   },

//   removeFromCart: async (
//     payload: RemoveFromCartPayload
//   ): Promise<Cart> => {
//     try {
//       const response = await api.post<Cart>("/api/cart/remove/", payload);
//       return response.data;
//     } catch (error) {
//       throw new Error(handleError(error));
//     }
//   },

//   clearCart: async (): Promise<Cart> => {
//     try {
//       const response = await api.post<Cart>("/api/cart/clear/");
//       return response.data;
//     } catch (error) {
//       throw new Error(handleError(error));
//     }
//   },
// };

// export default CartService;


import api from "./api";
import type {
  Cart,
  AddToCartPayload,
  UpdateCartPayload,
  RemoveFromCartPayload,
  CartErrorResponse,
} from "../types/Cart.type";
import axios from "axios";

const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as CartErrorResponse;

    if (!data) return "Unknown error";

    if ("detail" in data && data.detail) return data.detail;
    if ("message" in data && data.message) return data.message;

    return "Something went wrong";
  }

  return "Network error";
};

// ✅ helper يستخرج الـ cart من أي شكل response
// سواء رجع { cart: {...} } أو Cart مباشرة
const extractCart = (data: unknown): Cart => {
  if (data && typeof data === "object" && "cart" in data) {
    return (data as { cart: Cart }).cart;
  }
  return data as Cart;
};

const CartService = {
  getCart: async (): Promise<Cart> => {
    try {
      const response = await api.get("/api/cart/");
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error));
    }
  },

  addToCart: async (payload: AddToCartPayload): Promise<Cart> => {
    try {
      const response = await api.post("/api/cart/add/", payload);
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error));
    }
  },

  updateCart: async (payload: UpdateCartPayload): Promise<Cart> => {
    try {
      const response = await api.post("/api/cart/update/", payload);
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error));
    }
  },

  removeFromCart: async (payload: RemoveFromCartPayload): Promise<Cart> => {
    try {
      const response = await api.post("/api/cart/remove/", payload);
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error));
    }
  },

  clearCart: async (): Promise<Cart> => {
    try {
      const response = await api.post("/api/cart/clear/");
      return extractCart(response.data);
    } catch (error) {
      throw new Error(handleError(error));
    }
  },
};

export default CartService;