
import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import type { Product } from '../../types/Product.type';
import useCart from '../../hooks/usecart'; // عدّل الـ path حسب مشروعك

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const price = Number(product.price) || 0;
  const { addToCart,isAddingProduct } = useCart();
  const isAdding = isAddingProduct(product.id)


  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  addToCart({ product_id: product.id, quantity: 1 }).then(() => {
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  });
};

  return (
    <Link
      to={`/product/${product.id}`} state={{ product }}
      className="group bg-white rounded-2xl border border-[rgba(240,174,207,0.3)] overflow-hidden
      shadow-[0_2px_16px_rgba(192,80,138,0.08)] hover:shadow-[0_16px_48px_rgba(192,80,138,0.18)]
      hover:-translate-y-1.5 hover:border-[#e07aab] transition-all duration-300 cursor-pointer block"
    >
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-[#fef8fb] to-[#f8d7e8] flex items-center justify-center relative overflow-hidden">
        {product.url ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/media/${product.url}`}
            alt={product.product_name ?? 'Product Image'}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-6xl select-none">🧴</span>
        )}

        <div className="absolute top-2.5 right-2.5">
          <Badge variant="pink">{product.product_type}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-[#2d1a28] leading-snug mb-1.5 line-clamp-2">
          {product.product_name ?? 'Name Unavailable'}
        </h3>

        {product.clean_ingreds && (
          <p className="text-[11px] text-[#9e6e8a] line-clamp-2 leading-relaxed mb-3">
            {product.clean_ingreds}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="font-['Playfair_Display'] text-xl font-bold text-[#c0508a]">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isAdding|| added}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e07aab] to-[#c0508a] text-white
            flex items-center justify-center text-lg font-light
            shadow-[0_3px_10px_rgba(192,80,138,0.3)]
            hover:scale-110 hover:shadow-[0_5px_16px_rgba(192,80,138,0.45)]
            transition-all duration-200 disabled:opacity-50 disabled:scale-100"
          >
            {isAdding ? "⏳" : added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
