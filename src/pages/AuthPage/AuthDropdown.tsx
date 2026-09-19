
// ============================================================
// AuthDropdown.tsx - Luxury Skincare Cherry Blossom Edition
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

type Petal = {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  rotation: number;
};

const NUM_PETALS = 30;

const AuthDropdown = () => {
  const { isDropdownOpen, dropdownMode, closeDropdown, switchToLogin, switchToRegister } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // إنشاء البتلات مرة واحدة فقط
  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: NUM_PETALS }).map((_, i) => ({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * -600,
      size: Math.random() * 12 + 6,
      speed: Math.random() * 1 + 0.5,
      sway: Math.random() * 50 + 20,
      rotation: Math.random() * 360
    }))
  );

  // Canvas animation
  useEffect(() => {
    if (!isDropdownOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.y / 50) * 0.5;
        p.rotation += 0.5;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = 'rgba(255,182,193,0.4)'; // pink transparent
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDropdownOpen, petals]);

  // اغلاق عند الضغط خارج
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    if (isDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, closeDropdown]);

  // اغلاق ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDropdown();
    };
    if (isDropdownOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isDropdownOpen, closeDropdown]);

  // منع scroll عند فتح الفورم
  useEffect(() => {
    document.body.style.overflow = isDropdownOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDropdownOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Dropdown container */}
      <div
        ref={dropdownRef}
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isDropdownOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="mx-4 mt-4 relative overflow-hidden rounded-3xl shadow-2xl border border-white/40 
          bg-gradient-to-b from-white/100 to-white/90 backdrop-blur-xl">

          {/* Canvas للبتلات */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

          {/* المحتوى */}
          <div className="relative z-20 px-8 py-6 max-h-[90vh] overflow-y-auto">

            {/* زر اغلاق */}
            <button
              onClick={closeDropdown}
              className="absolute top-5 left-5 w-9 h-9 flex items-center justify-center
              rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* أزرار التبديل */}
            <div className="flex bg-[#F5F5DC] rounded-2xl p-1 mb-8 mt-2 border border-stone-200">
              <button
                onClick={switchToLogin}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition
                ${dropdownMode === 'login' ? 'bg-white text-rose-500 shadow' : 'text-stone-500 hover:text-stone-700'}`}
              >
                Login 🔑
              </button>
              <button
                onClick={switchToRegister}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition
                ${dropdownMode === 'register' ? 'bg-white text-rose-500 shadow' : 'text-stone-500 hover:text-stone-700'}`}
              >
                New Account 🌱
              </button>
            </div>

            {/* الفورم */}
            <div key={dropdownMode} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {dropdownMode === 'login' ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthDropdown;