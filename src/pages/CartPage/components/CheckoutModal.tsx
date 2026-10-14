import React, { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (step < 3) setStep((prev) => (prev + 1) as 1 | 2 | 3);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-20 sm:pt-25 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fadeIn" />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scaleIn">
        <div className="bg-gradient-to-r from-sakura-base to-white px-5 sm:px-6 pt-6 pb-4 border-b border-rose-100">
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-50 text-gray-400 hover:text-gray-600 hover:bg-rose-100 transition-colors flex items-center justify-center text-lg"
          >
            ×
          </button>

          <h2 className="font-bold text-gray-800 text-lg">Checkout</h2>

          <div className="flex items-center gap-2 mt-4">
            {[
              { num: 1, label: 'Personal' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Done' },
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= s.num ? 'bg-sakura-accent text-white' : 'bg-rose-100 text-gray-400'
                    }`}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span
                    className={`text-xs transition-colors ${
                      step >= s.num ? 'text-sakura-accent font-medium' : 'text-gray-300'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {i < 2 && (
                  <div
                    className={`flex-1 h-px transition-colors ${
                      step > s.num ? 'bg-sakura-accent' : 'bg-rose-100'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="px-5 sm:px-6 py-5">
          {step === 1 && (
            <div className="space-y-3 animate-fadeIn">
              <h3 className="font-semibold text-gray-700 text-sm mb-4">Personal Information</h3>

              {[
                {
                  name: 'fullName',
                  label: 'Full Name',
                  placeholder: 'Sara Al-Ahmad',
                  type: 'text',
                },
                { name: 'email', label: 'Email', placeholder: 'sara@example.com', type: 'email' },
                { name: 'phone', label: 'Phone', placeholder: '+962 7x xxx xxxx', type: 'tel' },
                {
                  name: 'address',
                  label: 'Address',
                  placeholder: '123 Rose Street, Amman',
                  type: 'text',
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs text-gray-400 font-medium block mb-1">
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full border border-rose-100 rounded-xl px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-sakura-accent focus:ring-1 focus:ring-rose-200 transition-colors"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 animate-fadeIn">
              <h3 className="font-semibold text-gray-700 text-sm mb-4">Payment Details</h3>

              <div className="h-28 bg-gradient-to-br from-sakura-accent to-sakura-dark rounded-2xl p-4 text-white mb-4 relative overflow-hidden">
                <p className="text-xs opacity-70 mb-3">Card Number</p>
                <p className="font-mono text-sm tracking-widest">
                  {form.cardNumber || '•••• •••• •••• ••••'}
                </p>
              </div>

              {[
                {
                  name: 'cardNumber',
                  label: 'Card Number',
                  placeholder: '1234 5678 9012 3456',
                  type: 'text',
                },
                { name: 'expiry', label: 'Expiry Date', placeholder: 'MM / YY', type: 'text' },
                { name: 'cvv', label: 'CVV', placeholder: '•••', type: 'password' },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                />
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <h3>Order Placed!</h3>
            </div>
          )}
        </div>

        <div className="px-5 sm:px-6 pb-6 flex gap-3">
          {step > 1 && <button onClick={handleBack}>Back</button>}
          {step < 3 && <button onClick={handleNext}>Next</button>}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
