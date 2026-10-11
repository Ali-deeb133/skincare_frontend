import React from 'react';
import { type FeaturedProduct } from '../../types/home.types';
import { useNavigate } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import { useSearchStore } from '../../store/searchStore';

interface FeaturedProductCardProps {
  product: FeaturedProduct;
}

export const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product }) => {
  const revealRef = useReveal();
  const navigate = useNavigate();
  const { resetFilters, setSearch } = useSearchStore();

  // These cards are showcase items, not catalogue products, so the button
  // opens the catalogue searched for the matching ingredient.
  const handleShop = () => {
    resetFilters();
    setSearch(product.searchTerm);
    navigate('/search');
  };

  return (
    <div
      ref={revealRef as React.RefObject<HTMLDivElement>}
      className="rounded-3xl overflow-hidden bg-white border border-[rgba(236,72,153,0.1)] shadow-[0_4px_20px_rgba(236,72,153,0.06)] transition-all duration-400 cursor-pointer hover:border-[rgba(236,72,153,0.3)] hover:shadow-[0_28px_65px_rgba(236,72,153,0.18)] hover:translate-y-[-10px] reveal"
      style={{ transitionDelay: product.delay }}
    >
      <div
        className={`h-70 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${product.gradient}`}
      >
        <div className="relative w-full h-72 overflow-hidden flex items-center justify-center bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full max-h-[85%] object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="absolute w-50 h-50 rounded-full bg-white/18 -bottom-15 -right-10"></div>
      </div>

      <div className="p-6 pb-7.5">
        <div className="text-[11px] font-bold text-primary tracking-wider uppercase mb-1.75">
          {product.subtitle}
        </div>
        <div className="font-serif text-2xl font-bold text-plum mb-2.5">{product.name}</div>
        <p className="text-[13px] text-plum-muted leading-[1.75] mb-5.5 font-light">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="font-serif text-3xl font-bold text-secondary">${product.price}</div>
          <button
            onClick={handleShop}
            className="px-5.5 py-2.5 rounded-full bg-[rgba(236,72,153,0.07)] text-primary border border-[rgba(236,72,153,0.2)] font-bold text-sm cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white hover:border-transparent hover:shadow-[0_8px_22px_rgba(236,72,153,0.35)]"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};
