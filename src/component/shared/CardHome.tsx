import React from 'react';
import {  type Product } from '../../types/productHome.types';
import { Badge } from '../ui/Badge';
import { useReveal } from '../../hooks/useReveal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const revealRef = useReveal();

  return (
    <div
      ref={revealRef as React.RefObject<HTMLDivElement>}
      className="product-card rounded-3xl overflow-hidden bg-white border border-[rgba(236,72,153,0.1)] shadow-[0_4px_20px_rgba(236,72,153,0.06)] transition-all duration-400 cursor-pointer hover:border-[rgba(236,72,153,0.3)] hover:shadow-[0_28px_65px_rgba(236,72,153,0.18)] hover:translate-y-[-10px] reveal"
      style={{ transitionDelay: product.delay }}
    >
      <div className={`h-70 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${product.gradient}`}>
        {/* <Badge>{product.badge}</Badge> */}
        <div className="relative w-full h-72 overflow-hidden flex items-center justify-center bg-white">
  <img
    src={product.image}
    alt={product.name}
    className="h-full max-h-[85%] object-contain transition-transform duration-500 hover:scale-105"
  />
</div>
        <div className="deco-circle absolute w-50 h-50 rounded-full bg-white/18 -bottom-15 -right-10"></div>
      </div>

      <div className="p-6 pb-7.5">
        <div className="text-[11px] font-bold text-[#ec4899] tracking-wider uppercase mb-1.75">
          {product.subtitle}
        </div>
        <div className="font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#1a0a14] mb-2.5">
          {product.name}
        </div>
        <p className="text-[13px] text-[#9d6b8e] leading-[1.75] mb-5.5 font-light">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="font-['Cormorant_Garamond',serif] text-3xl font-bold text-[#be185d]">
            ${product.price}
          </div>
          <button className="add-btn px-5.5 py-2.5 rounded-full bg-[rgba(236,72,153,0.07)] text-[#ec4899] border border-[rgba(236,72,153,0.2)] font-bold text-sm cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#ec4899] hover:to-[#db2777] hover:text-white hover:border-transparent hover:shadow-[0_8px_22px_rgba(236,72,153,0.35)]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};