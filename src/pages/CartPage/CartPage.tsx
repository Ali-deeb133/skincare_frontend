






// ============================================
// CartPage.tsx — Lumière Skincare
// الواجهة الكاملة لصفحة السلة
// ============================================

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useCart from "../../hooks/usecart";
// import CartItemCard from "./Components/CartItemCard";
// import OrderSummary from "./Components/OrderSummary";
// import EmptyCart from "./Components/EmptyCart";
// import NotLoggedInBanner from "./Components/NotLoggedInBanner";
// import Toast from "./Components/Toast";
// import CheckoutModal from "./Components/CheckoutModel";

// const CartPage: React.FC = () => {
//   const navigate = useNavigate();

//   // ✅ useCart() مرة وحدة بس — هاي كانت المشكلة الأولى
//   const {
//     cart,
//     user,
//     isEmpty,
//     isLoading,
//     itemCount,
//     totalPrice,
//     toastMessage,
//     clearCart,
//     loadingAction,
//     fetchCart,
//   } = useCart();

//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

//   useEffect(() => {
//     fetchCart();
//   }, []); // مرة وحدة لما الصفحة تفتح

//   // بعد ✅
// const handleClear = () => {
//   clearCart();
// };

//   // ---- Not logged in ----
//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-white to-rose-50">
//         <div className="max-w-4xl mx-auto px-4 py-12">
//           <CartHeader itemCount={0} />
//           <NotLoggedInBanner />
//         </div>
//         <Toast message={toastMessage} />
//       </div>
//     );
//   }

//   // ---- Loading initial fetch ----
//   // if (loadingAction === "fetch") {
//   //   return (
//   //     <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-white to-rose-50 flex items-center justify-center">
//   //       <CartSkeleton />
//   //     </div>
//   //   );
//   // }
  
// if (loadingAction === "fetch" || (cart === null && !loadingAction)) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-white to-rose-50 flex items-center justify-center">
//       <CartSkeleton />
//     </div>
//   );
// }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-white to-rose-50">
//       {/* Decorative blobs */}
//       <div className="fixed top-0 right-0 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
//       <div className="fixed bottom-0 left-0 w-80 h-80 bg-pink-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

//       <div className="relative max-w-5xl mx-auto px-4 py-10">
//         {/* Header */}
//         <CartHeader itemCount={itemCount} />

//         {/* Empty State */}
//         {isEmpty ? (
//           <EmptyCart onShop={() => navigate("/search")} />
//         ) : (
//           <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
//             {/* Left: Cart Items */}
//             <div className="space-y-3">
//               {/* Items count bar */}
//               <div className="flex items-center justify-between mb-2 px-1">
//                 <p className="text-sm text-gray-500">
//                   {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
//                 </p>
//                 <button
//                   onClick={handleClear}
//                   disabled={isLoading}
//                   className="text-xs text-gray-300 hover:text-rose-400 transition-colors disabled:opacity-40"
//                 >
//                   Remove all
//                 </button>
//               </div>

//               {/* ✅ حماية إضافية — تأكد إن items موجودة قبل الـ map */}
//               {Array.isArray(cart?.items) &&
//                 cart.items.map((item, index) => (
//                   <div
//                     key={item.id}
//                     style={{ animationDelay: `${index * 80}ms` }}
//                     className="animate-fadeIn"
//                   >
//                     <CartItemCard item={item} />
//                   </div>
//                 ))}

//               {/* Continue shopping */}
//               <button
//                 onClick={() => navigate("/search")}
//                 className="mt-2 text-sm text-[#e07aab] hover:text-[#c0508a] transition-colors flex items-center gap-1 px-1"
//               >
//                 ← Continue Shopping
//               </button>
//             </div>

//             {/* Right: Order Summary */}
//             <div>
//               <OrderSummary
//                 totalPrice={totalPrice}
//                 itemCount={itemCount}
//                 onCheckout={() => setIsCheckoutOpen(true)}
//                 onClear={handleClear}
//                 loadingAction={loadingAction}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Toast */}
//       <Toast message={toastMessage} />

//       {/* Checkout Modal */}
//       <CheckoutModal
//         isOpen={isCheckoutOpen}
//         onClose={() => setIsCheckoutOpen(false)}
//         totalPrice={totalPrice}
//       />
//     </div>
//   );
// };

// // ---- Cart Header Component ----
// const CartHeader: React.FC<{ itemCount: number }> = ({ itemCount }) => (
//   <div className=" pt-25 flex items-center gap-3 ">
//     <p className="text-xs text-[#e07aab] font-medium tracking-widest uppercase">
//       Lumière
//     </p>
//     <h1 className="text-3xl font-bold text-gray-800">
//       Shopping Cart
//       {itemCount > 0 && (
//         <span className="ml-3 text-base font-normal text-gray-400">
//           ({itemCount} {itemCount === 1 ? "item" : "items"})
//         </span>
//       )}
//     </h1>
//   </div>
// );

// // ---- Skeleton Loader ----
// const CartSkeleton: React.FC = () => (
//   <div className="w-full max-w-5xl mx-auto px-4 animate-pulse">
//     <div className="h-8 bg-rose-100 rounded-xl w-48 mb-8" />
//     <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
//       <div className="space-y-3">
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="h-24 bg-rose-50 rounded-2xl" />
//         ))}
//       </div>
//       <div className="h-64 bg-rose-50 rounded-3xl" />
//     </div>
//   </div>
// );

// export default CartPage;







import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/usecart";
import CartItemCard from "./Components/CartItemCard";
import OrderSummary from "./Components/OrderSummary";
import EmptyCart from "./Components/EmptyCart";
import NotLoggedInBanner from "./Components/NotLoggedInBanner";
import Toast from "./Components/Toast";
import CheckoutModal from "./Components/CheckoutModel";

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    cart,
    user,
    isEmpty,
    isLoading,
    itemCount,
    totalPrice,
    toastMessage,
    clearCart,
    loadingAction,
    fetchCart,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const handleClearConfirmed = () => {
    setShowClearConfirm(false);
    clearCart();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-white to-rose-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <CartHeader itemCount={0} />
          <NotLoggedInBanner />
        </div>
        <Toast message={toastMessage} />
      </div>
    );
  }

  if (loadingAction === "fetch" || (cart === null && !loadingAction)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-white to-rose-50 flex items-center justify-center">
        <CartSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf0f5] via-white to-rose-50">
      {/* Decorative blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-pink-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Clear Confirm Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowClearConfirm(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-xl border border-rose-100 p-6 w-full max-w-sm">
            <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗑️</span>
            </div>
            <h3 className="text-center font-bold text-gray-800 text-base mb-1">
              Clear your cart?
            </h3>
            <p className="text-center text-sm text-gray-400 mb-6">
              All {itemCount} items will be removed. This can't be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-2xl border border-rose-100 text-gray-500 text-sm font-medium hover:bg-rose-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearConfirmed}
                className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-[#e07aab] to-[#c0508a] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Yes, clear it
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto px-4 py-10">
        <CartHeader itemCount={itemCount} />

        {isEmpty ? (
          <EmptyCart  />
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-sm text-gray-500">
                  {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                </p>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  disabled={isLoading}
                  className="text-xs text-gray-300 hover:text-rose-400 transition-colors disabled:opacity-40"
                >
                  Remove all
                </button>
              </div>

              {Array.isArray(cart?.items) &&
                cart.items.map((item, index) => (
                  <div
                    key={item.id}
                    style={{ animationDelay: `${index * 80}ms` }}
                    className="animate-fadeIn"
                  >
                    <CartItemCard item={item} />
                  </div>
                ))}

              <button
                onClick={() => navigate("/search")}
                className="mt-2 text-sm text-[#e07aab] hover:text-[#c0508a] transition-colors flex items-center gap-1 px-1"
              >
                ← Continue Shopping
              </button>
            </div>

            <div>
              <OrderSummary
                totalPrice={totalPrice}
                itemCount={itemCount}
                onCheckout={() => setIsCheckoutOpen(true)}
                // onClear={() => setShowClearConfirm(true)}
                loadingAction={loadingAction}
              />
            </div>
          </div>
        )}
      </div>

      <Toast message={toastMessage} />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalPrice={totalPrice}
      />
    </div>
  );
};

const CartHeader: React.FC<{ itemCount: number }> = ({ itemCount }) => (
  <div className="pt-25 flex items-center gap-3">
    <p className="text-xs text-[#e07aab] font-medium tracking-widest uppercase">
      Lumière
    </p>
    <h1 className="text-3xl font-bold text-gray-800">
      Shopping Cart
      {itemCount > 0 && (
        <span className="ml-3 text-base font-normal text-gray-400">
          ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>
      )}
    </h1>
  </div>
);

const CartSkeleton: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto px-4 animate-pulse">
    <div className="h-8 bg-rose-100 rounded-xl w-48 mb-8" />
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-rose-50 rounded-2xl" />
        ))}
      </div>
      <div className="h-64 bg-rose-50 rounded-3xl" />
    </div>
  </div>
);

export default CartPage