
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useProducts } from "../../hooks/useproduct";
import useCart from "../../hooks/usecart";
import type { Product } from "../../types/Product.type";
import { getOptimizedImageUrl } from "../../utils/imgeUrl";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();

  // جلب المنتج من الـ state أو من API
  const stateProduct = location.state?.product as Product | undefined;
  const { products, loading } = useProducts();

  const product = stateProduct ?? products.find(
    (p) => String(p.id) === String(id)
  );

  // 🔥 cart logic
  const { addToCart, isAddingProduct } = useCart();
  const isAdding = product ? isAddingProduct(product.id) : false;
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart({ product_id: product.id, quantity: 1 });
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  if (loading && !product) {
    return (
      <div className="pt-32 text-center text-gray-400 animate-pulse">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Product not found
      </div>
    );
  }

  const ingredients = product.clean_ingreds?.split(",");

  return (
    <div className="min-h-screen bg-[#fdf0f5] pt-35 px-6">
      <div className="max-w-6xl mx-auto">

        {/* BACK */}
        {/* <button
          onClick={() => window.history.back()}
          className="mb-6 px-3 py-1.5 rounded-full border border-[#f0aecf]
          bg-white/70 backdrop-blur text-[#c0508a]
          hover:bg-[#fdf0f5] transition"
        >
          ← Back
        </button> */}

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-lg p-8">

          {/* IMAGE */}
          <div className="flex items-center justify-center group">
            <img
              // src={`http://localhost:8000/media/${product.url}`}
              src={getOptimizedImageUrl(`${import.meta.env.VITE_API_URL}/media/${product.url}`)}
              alt={product.product_name}
              className="w-full max-w-md object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6">

            <h1 className="text-3xl font-bold text-[#2d1a28] leading-snug">
              {product.product_name}
            </h1>

            <span className="w-fit px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-600 font-medium">
              {product.product_type}
            </span>

            <p className="text-2xl font-semibold text-[#e07aab]">
              ${product.price}
            </p>

            <p className="text-[#6a4a5c] leading-relaxed">
              A high-quality skincare product designed to support your skin
              routine with carefully selected ingredients.
            </p>

            {/* 🔥 ADD TO CART BUTTON */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding || added}
              className="mt-2 bg-[#e07aab] text-white font-semibold py-3 rounded-xl 
              hover:bg-[#c0508a] transition-all duration-300 hover:scale-[1.03] 
              active:scale-95 shadow-md disabled:opacity-50"
            >
              {isAdding ? "Adding..." : added ? "✓ Added" : "Add to Cart"}
            </button>

          </div>
        </div>

        {/* INGREDIENTS */}
        {ingredients && (
          <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#2d1a28] mb-4">
              Ingredients
            </h2>
            <div className="grid md:grid-cols-2 gap-2 text-[#6a4a5c]">
              {ingredients.map((item: string, index: number) => (
                <span
                  key={index}
                  className="bg-[#fdf0f5] px-3 py-2 rounded-lg text-sm"
                >
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