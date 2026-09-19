

import React, { useState } from "react";

interface OrderSummaryProps {
  totalPrice: number;
  itemCount: number;
  onCheckout: () => void;
  // onClear: () => void;
  loadingAction: string | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalPrice,
  itemCount,
  onCheckout,
  // onClear,
  loadingAction,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const freeShippingThreshold = 50;
  const shipping = totalPrice >= freeShippingThreshold ? 0 : 5.99;
  const finalTotal = totalPrice + shipping;
  const isClearing = loadingAction === "clear";

  // const handleClearClick = () => setShowConfirm(true);

  // const handleConfirm = () => {
  //   setShowConfirm(false);
  //   onClear();
  // };

  return (
    <>
      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />

          {/* Card */}
          <div className="relative bg-white rounded-3xl shadow-xl border border-rose-100 p-6 w-full max-w-sm animate-[fadeSlide_0.3s_ease]">
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗑️</span>
            </div>

            <h3 className="text-center font-bold text-gray-800 text-base mb-1">
              Clear your cart?
            </h3>
            <p className="text-center text-sm text-gray-400 mb-6">
              All {itemCount} items will be removed. This can't be undone.
            </p>
{/* 
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-2xl border border-rose-100 text-gray-500 text-sm font-medium hover:bg-rose-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-[#e07aab] to-[#c0508a] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Yes, clear it
              </button>
            </div> */}
          </div>
        </div>
      )}

      {/* Order Summary Card */}
      <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm sticky top-24">
        <h2 className="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
          <span className="text-xl">🛍️</span> Order Summary
        </h2>

        <div className="space-y-3 mb-5">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal ({itemCount} items)</span>
            <span className="text-gray-700 font-medium">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Shipping</span>
            {shipping === 0 ? (
              <span className="text-emerald-500 font-semibold">Free ✨</span>
            ) : (
              <span className="text-gray-700 font-medium">
                ${shipping.toFixed(2)}
              </span>
            )}
          </div>

          {shipping > 0 && (
            <div className="pt-1">
              <p className="text-xs text-gray-400 mb-1.5">
                Add ${(freeShippingThreshold - totalPrice).toFixed(2)} more
              </p>
              <div className="h-1.5 bg-rose-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#e07aab] to-[#c0508a]"
                  style={{
                    width: `${Math.min(
                      (totalPrice / freeShippingThreshold) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="border-t border-rose-100 pt-3 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span className="text-[#e07aab] text-lg">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          disabled={isClearing}
          className="w-full py-3.5 bg-gradient-to-r from-[#e07aab] to-[#c0508a] text-white font-semibold rounded-2xl hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          Proceed to Checkout →
        </button>

        {/* <button
          onClick={handleClearClick}
          disabled={isClearing}
          className="w-full mt-3 py-2.5 text-gray-400 text-xs hover:text-[#c0508a] transition-colors disabled:opacity-40"
        >
          Clear cart
        </button> */}
      </div>
    </>
  );
};

export default OrderSummary;