import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';
import type { Product } from '../../types/product.types';
import { getProductImageUrl } from '../../utils/imageUrl';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();

  // جلب المنتج من الـ state أو من API
  const stateProduct = location.state?.product as Product | undefined;
  const { product, loading } = useProduct(id, stateProduct);

  // 🔥 cart logic
  const { addToCart, isAddingProduct } = useCart();
  const isAdding = product ? isAddingProduct(product.id) : false;
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;

    const ok = await addToCart({ product_id: product.id, quantity: 1 });
    if (!ok) return;

    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  if (loading) {
    return <div className="pt-32 text-center text-gray-400 animate-pulse">Loading product...</div>;
  }

  if (!product) {
    return <div className="pt-32 text-center text-gray-500">Product not found</div>;
  }

  const ingredients = product.clean_ingreds?.split(',');

  return (
    <div className="min-h-screen bg-sakura-base pt-24 sm:pt-35 px-4 sm:px-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 bg-white rounded-3xl shadow-lg p-5 sm:p-8">
          {/* IMAGE */}
          <div className="flex items-center justify-center group">
            <img
              src={getProductImageUrl(product.url)}
              alt={product.product_name}
              className="w-full max-w-md max-h-[320px] md:max-h-none object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-sakura-ink leading-snug">
              {product.product_name}
            </h1>

            <span className="w-fit px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-600 font-medium">
              {product.product_type}
            </span>

            <p className="text-2xl font-semibold text-sakura-accent">
              ${(Number(product.price) || 0).toFixed(2)}
            </p>

            <p className="text-[#6a4a5c] leading-relaxed">
              A high-quality skincare product designed to support your skin routine with carefully
              selected ingredients.
            </p>

            {/* 🔥 ADD TO CART BUTTON */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding || added}
              className="mt-2 bg-sakura-accent text-white font-semibold py-3 rounded-xl 
              hover:bg-sakura-dark transition-all duration-300 hover:scale-[1.03] 
              active:scale-95 shadow-md disabled:opacity-50"
            >
              {isAdding ? 'Adding...' : added ? '✓ Added' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* INGREDIENTS */}
        {ingredients && (
          <div className="mt-6 sm:mt-12 bg-white rounded-2xl shadow-md p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-sakura-ink mb-4">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-2 text-[#6a4a5c]">
              {ingredients.map((item: string, index: number) => (
                <span key={index} className="bg-sakura-base px-3 py-2 rounded-lg text-sm">
                  {item.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
