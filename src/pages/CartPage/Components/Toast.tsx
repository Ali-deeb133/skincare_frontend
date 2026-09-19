import React from "react";

interface ToastProps {
  message: string | null;
}

 const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
      <div className="bg-white border border-rose-200 shadow-xl shadow-rose-100/50 rounded-2xl px-5 py-3 flex items-center gap-2 text-sm text-gray-700 font-medium">
        <span className="text-base">🌸</span>
        {message}
      </div>
    </div>
  );
};

export default Toast;