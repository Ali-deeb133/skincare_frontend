// components/ui/LogoutModal.tsx

import React, { useEffect } from 'react';

type LogoutModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {

  // إغلاق المودال عند الضغط على زر Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  // إذا المودال مغلق لا يتم رسمه
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onCancel}
    >
      {/* الخلفية المعتمة */}
      <div className="absolute inset-0 bg-pink-950/20 backdrop-blur-sm" />

      {/* صندوق المودال */}
      <div
        className="relative z-10 bg-white rounded-3xl 
                   shadow-[0_20px_60px_rgba(236,72,153,0.15)]
                   px-8 py-8 w-[90%] max-w-sm mx-auto
                   border border-pink-100
                   animate-[fadeScaleIn_0.2s_ease_both]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* أيقونة */}
        <div className="flex justify-center mb-4">
          <div
            className="w-14 h-14 rounded-full bg-pink-50 
                       flex items-center justify-center text-3xl
                       shadow-[0_4px_16px_rgba(236,72,153,0.12)]"
          >
            🌸
          </div>
        </div>

        {/* العنوان */}
        <h2 className="text-center font-['Cormorant_Garamond',serif] text-2xl font-bold text-pink-800 mb-2">
         Logout
        </h2>

        {/* الوصف */}
        <p className="text-center text-sm text-pink-400 mb-7">
         Do you want to logout?
         </p>
         <p className="text-center text-xs text-gray-400 mb-6">
          Natural care for your skin 🌿
        </p>

        {/* الأزرار */}
        <div className="flex gap-3">

          {/* زر الإلغاء */}
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-2xl border border-pink-200
                       text-pink-500 text-sm font-medium
                       transition-all duration-200
                       hover:bg-pink-50 hover:border-pink-300"
          >
           No
          </button>

          {/* زر التأكيد */}
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-2xl
                       bg-gradient-to-r from-pink-500 to-pink-400
                       text-white text-sm font-medium
                       shadow-[0_4px_14px_rgba(236,72,153,0.3)]
                       transition-all duration-200
                       hover:shadow-[0_6px_20px_rgba(236,72,153,0.4)]
                       hover:-translate-y-0.5"
          >
           yes
          </button>

        </div>

      </div>
    </div>
  );
};


