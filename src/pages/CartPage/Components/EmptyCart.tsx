import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fadeIn">
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center animate-float">
          <span className="text-5xl">🛒</span>
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-rose-200 rounded-full flex items-center justify-center text-sm animate-bounce">
          0
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
      <p className="text-gray-400 text-sm mb-8 max-w-xs">
        Discover our clean skincare collection and treat your skin to something special 🌸
      </p>

      <button
        onClick={() => navigate("/search")}
        className="px-8 py-3 bg-gradient-to-r from-[#e07aab] to-[#c0508a] text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-pink-200 hover:-translate-y-0.5 transition-all duration-200 text-sm"
      >
        Explore Products ✨
      </button>
    </div>
  );
};

export default EmptyCart;