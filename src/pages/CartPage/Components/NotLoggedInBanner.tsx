import React from "react";

 const NotLoggedInBanner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fadeIn">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center mb-6 animate-float">
        <span className="text-4xl">🔐</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Please log in first</h2>
      <p className="text-gray-400 text-sm max-w-xs">
        You need to be logged in to view and manage your cart 🌸
      </p>
    </div>
  );
};

export default NotLoggedInBanner