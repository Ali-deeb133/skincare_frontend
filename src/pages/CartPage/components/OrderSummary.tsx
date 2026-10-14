import React from 'react';

interface OrderSummaryProps {
  totalPrice: number;
  itemCount: number;
  onCheckout: () => void;
  loadingAction: string | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalPrice,
  itemCount,
  onCheckout,
  loadingAction,
}) => {
  const freeShippingThreshold = 50;
  const shipping = totalPrice >= freeShippingThreshold ? 0 : 5.99;
  const finalTotal = totalPrice + shipping;
  const isClearing = loadingAction === 'clear';

  return (
    <>
      {/* Order Summary Card */}
      <div className="bg-white rounded-3xl border border-rose-100 p-5 sm:p-6 shadow-sm lg:sticky lg:top-24">
        <h2 className="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
          <span className="text-xl">🛍️</span> Order Summary
        </h2>

        <div className="space-y-3 mb-5">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal ({itemCount} items)</span>
            <span className="text-gray-700 font-medium">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Shipping</span>
            {shipping === 0 ? (
              <span className="text-emerald-500 font-semibold">Free ✨</span>
            ) : (
              <span className="text-gray-700 font-medium">${shipping.toFixed(2)}</span>
            )}
          </div>

          {shipping > 0 && (
            <div className="pt-1">
              <p className="text-xs text-gray-400 mb-1.5">
                Add ${(freeShippingThreshold - totalPrice).toFixed(2)} more
              </p>
              <div className="h-1.5 bg-rose-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sakura-accent to-sakura-dark"
                  style={{
                    width: `${Math.min((totalPrice / freeShippingThreshold) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="border-t border-rose-100 pt-3 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span className="text-sakura-accent text-lg">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          disabled={isClearing}
          className="w-full py-3.5 bg-gradient-to-r from-sakura-accent to-sakura-dark text-white font-semibold rounded-2xl hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          Proceed to Checkout →
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
