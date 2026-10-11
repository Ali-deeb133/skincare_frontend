import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import type { Product } from '../../types/product.types';
import useCart from '../../hooks/useCart';
import { getProductImageUrl } from '../../utils/imageUrl';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const price = Number(product.price) || 0;
  const { addToCart, isAddingProduct } = useCart();
  const isAdding = isAddingProduct(product.id);

  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ product_id: product.id, quantity: 1 }).then((ok) => {
      if (!ok) return;
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      state={{ product }}
      className="group bg-white rounded-2xl border border-[rgba(240,174,207,0.3)] overflow-hidden
      shadow-[0_2px_16px_rgba(192,80,138,0.08)] hover:shadow-[0_16px_48px_rgba(192,80,138,0.18)]
      hover:-translate-y-1.5 hover:border-sakura-accent transition-all duration-300 cursor-pointer block"
    >
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-sakura-light to-sakura-mid flex items-center justify-center relative overflow-hidden">
        {product.url ? (
          <img
            src={getProductImageUrl(product.url)}
            alt={product.product_name ?? 'Product Image'}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-6xl select-none">🧴</span>
        )}

        <Badge className="absolute top-6.5 right-6.5">{product.product_type}</Badge>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-sakura-ink leading-snug mb-1.5 line-clamp-2">
          {product.product_name ?? 'Name Unavailable'}
        </h3>

        {product.clean_ingreds && (
          <p className="text-[11px] text-sakura-muted line-clamp-2 leading-relaxed mb-3">
            {product.clean_ingreds}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-sakura-dark">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.product_name ?? 'product'} to cart`}
            disabled={isAdding || added}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-sakura-accent to-sakura-dark text-white
            flex items-center justify-center text-lg font-light
            shadow-[0_3px_10px_rgba(192,80,138,0.3)]
            hover:scale-110 hover:shadow-[0_5px_16px_rgba(192,80,138,0.45)]
            transition-all duration-200 disabled:opacity-50 disabled:scale-100"
          >
            {isAdding ? '⏳' : added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
