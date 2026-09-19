
import React, { useState } from "react";
import useCart from "../../../hooks/usecart";
import type { CartItem as CartItemType } from "../../../types/Cart.type";

const CartItemCard: React.FC<{ item: CartItemType }> = ({ item }) => {
  const {
    updateCart,
    removeFromCart,
    isUpdatingItem,
    isRemovingItem,
  } = useCart();

  const isUpdating = isUpdatingItem(item.id);
  const isRemoving = isRemovingItem(item.id);

  const [lastAction, setLastAction] = useState<"increase" | "decrease" | null>(null);

  const isIncreasing = isUpdating && lastAction === "increase";
  const isDecreasing = isUpdating && lastAction === "decrease";

  const handleIncrease = () => {
    if (isUpdating) return;
    setLastAction("increase");
    updateCart({ item_id: item.id, action: "increase" });
  };

  const handleDecrease = () => {
    if (isUpdating || isRemoving) return;
    setLastAction("decrease");
    if (item.quantity === 1) {
      removeFromCart({ item_id: item.id });
    } else {
      updateCart({ item_id: item.id, action: "decrease" });
    }
  };

  const handleRemove = () => {
    if (isRemoving) return;
    removeFromCart({ item_id: item.id });
  };

  return (
    <div
      className={`group flex gap-4 p-4 bg-white rounded-2xl border border-rose-100 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100/50 transition-all duration-300 animate-fadeIn ${
        isRemoving ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="relative w-20 h-20 rounded-xl bg-gradient-to-br from-rose-50 to-pink-100 flex-shrink-0 overflow-hidden">
        {item.product.url ? (
          <img
            src={`http://localhost:8000/media/${item.product.url}`}
            alt={item.product.product_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl">🌸</span>
          </div>
        )}

        <span className="absolute top-1 left-1 text-[9px] bg-white/80 backdrop-blur-sm text-rose-400 px-1.5 py-0.5 rounded-full font-medium">
          {item.product.product_type}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate text-sm leading-tight">
          {item.product.product_name || "Lumière Product"}
        </h3>

        <p className="text-xs text-gray-400 mt-0.5 truncate ">
          {item.product.clean_ingreds?.slice(0,80) || "Clean Ingredients"}
        </p>

        <p className="text-[#e07aab] font-bold mt-1 text-sm">
          ${item.product.price.toFixed(2)}
          <span className="text-gray-400 font-normal text-xs"> / each</span>
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-rose-50 rounded-full px-2 py-1">
            {/* زر - */}
            <button
              onClick={handleDecrease}
              disabled={isUpdating || isRemoving}
              className="w-6 h-6 rounded-full bg-white text-[#e07aab] font-bold text-sm flex items-center justify-center hover:bg-rose-100 transition-colors disabled:opacity-40 shadow-sm"
            >
              {isDecreasing ? "⏳" : "−"}
            </button>

            <span className="text-gray-700 font-semibold text-sm w-4 text-center">
              {item.quantity}
            </span>

            {/* زر + */}
            <button
              onClick={handleIncrease}
              disabled={isUpdating}
              className="w-6 h-6 rounded-full bg-[#e07aab] text-white font-bold text-sm flex items-center justify-center hover:bg-[#c0508a] transition-colors disabled:opacity-40 shadow-sm"
            >
              {isIncreasing ? "⏳" : "+"}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-800 text-sm">
              ${item.total_price.toFixed(2)}
            </span>

           <button
  onClick={handleRemove}
  disabled={isRemoving || isUpdating}
  className="flex items-center gap-1 px-3 py-1.5 rounded-full
  bg-rose-50 text-rose-500 text-xs font-medium
  hover:bg-rose-100 hover:text-rose-600
  transition-all duration-200
  disabled:opacity-40"
>
  {isRemoving ? "⏳ Removing..." : "🗑 Remove"}
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;