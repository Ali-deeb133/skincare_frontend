// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// type Product = {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
//   ingredients?: string[];
//   price?: number;
// };

// const ProductDetailPage: React.FC = () => {

//   const { id } = useParams();

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const fetchProduct = async () => {
//       try {

//         const res = await fetch(`/product/${id}`);
//         const data = await res.json();

//         setProduct(data);

//       } catch (err) {

//         console.error('Error fetching product', err);

//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();

//   }, [id]);



//   if (loading) {
//     return (
//       <div className="pt-24 text-center">
//         Loading product...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="pt-24 text-center">
//         Product not found
//       </div>
//     );
//   }

//   return (

//     <div className="min-h-screen bg-[#fdf0f5] pt-24 px-4 md:px-8">

//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

//         {/* Image */}
//         <div className="bg-white rounded-xl shadow-sm p-6">

//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-[400px] object-contain"
//           />

//         </div>


//         {/* Info */}
//         <div className="flex flex-col gap-5">

//           <h1 className="text-3xl font-semibold text-[#2d1a28]">
//             {product.name}
//           </h1>


//           {product.price && (

//             <p className="text-xl text-[#e07aab] font-medium">
//               ${product.price}
//             </p>

//           )}


//           <p className="text-[#6a4a5c] leading-relaxed">

//             {product.description}

//           </p>


//           {/* Ingredients */}
//           {product.ingredients && product.ingredients.length > 0 && (

//             <div>

//               <h3 className="font-semibold text-[#2d1a28] mb-2">
//                 Ingredients
//               </h3>

//               <ul className="list-disc list-inside text-[#6a4a5c] space-y-1">

//                 {product.ingredients.map((ing, index) => (

//                   <li key={index}>{ing}</li>

//                 ))}

//               </ul>

//             </div>

//           )}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ProductDetailPage;









// import React from "react";
// import { useParams } from "react-router-dom";
// import { useProducts } from "../../hooks/useproduct";

// const ProductDetailPage: React.FC = () => {

//   const { id } = useParams();
//   const { products, loading } = useProducts();

//   if (loading) {
//     return (
//       <div className="pt-32 text-center text-gray-400 animate-pulse">
//         Loading product...
//       </div>
//     );
//   }

//   const product = products.find(
//     (p) => String(p.id) === String(id)
//   );

//   if (!product) {
//     return (
//       <div className="pt-32 text-center text-gray-500">
//         Product not found
//       </div>
//     );
//   }

//   const ingredients = product.clean_ingreds?.split(",");

//   return (

//     <div className="min-h-screen bg-[#fdf0f5] pt-24 px-6">

//       <div className="max-w-6xl mx-auto">

//         {/* Back Button */}

//         <button
//           onClick={() => window.history.back()}
//           className="mb-6 text-sm text-[#c0508a] hover:underline"
//         >
//           ← Back
//         </button>

//         <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-lg p-8">

//           {/* IMAGE */}

//           <div className="flex items-center justify-center group">

//             <img
//               src={`http://localhost:8000/media/${product.url}`}
//               alt={product.product_name}
//               className="w-full max-w-md object-contain transition-transform duration-500 group-hover:scale-105"
//             />

//           </div>


//           {/* INFO */}

//           <div className="flex flex-col gap-6">

//             {/* NAME */}

//             <h1 className="text-3xl font-bold text-[#2d1a28] leading-snug">
//               {product.product_name}
//             </h1>


//             {/* TYPE */}

//             <span className="w-fit px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-600 font-medium">
//               {product.product_type}
//             </span>


//             {/* PRICE */}

//             <p className="text-2xl font-semibold text-[#e07aab]">
//               ${product.price}
//             </p>


//             {/* DESCRIPTION */}

//             <p className="text-[#6a4a5c] leading-relaxed">
//               A high-quality skincare product designed to support your skin
//               routine with carefully selected ingredients.
//             </p>


//             {/* ADD TO CART */}

//             <button
//               className="
//               mt-2
//               bg-[#e07aab]
//               text-white
//               font-semibold
//               py-3
//               rounded-xl
//               hover:bg-[#c0508a]
//               transition-all
//               duration-300
//               hover:scale-[1.03]
//               active:scale-95
//               shadow-md
//               "
//             >
//               Add to Cart
//             </button>

//           </div>

//         </div>


//         {/* INGREDIENTS */}

//         {ingredients && (

//           <div className="mt-12 bg-white rounded-2xl shadow-md p-6">

//             <h2 className="text-xl font-semibold text-[#2d1a28] mb-4">
//               Ingredients
//             </h2>

//             <div className="grid md:grid-cols-2 gap-2 text-[#6a4a5c]">

//               {ingredients.map((item: string, index: number) => (

//                 <span
//                   key={index}
//                   className="bg-[#fdf0f5] px-3 py-2 rounded-lg text-sm"
//                 >
//                   {item.trim()}
//                 </span>

//               ))}

//             </div>

//           </div>

//         )}

//       </div>

//     </div>

//   );
// };

// export default ProductDetailPage;










// import React from "react";
// import { useParams, useLocation } from "react-router-dom";
// import { useProducts } from "../../hooks/useproduct";
// import type { Product } from "../../types/Product.type";



// const ProductDetailPage: React.FC = () => {
//   const { id } = useParams();
//   const location = useLocation();
  
//   // أول شي جرب تاخد البيانات من الـ state (مجاني وسريع)
//   // إذا ما في state (مثلاً فتح الرابط مباشرة) اجيبها من الـ API
//   const stateProduct = location.state?.product as Product | undefined;
  
//   const { products, loading } = useProducts();
  
//   const product = stateProduct ?? products.find(
//     (p) => String(p.id) === String(id)
//   );

//   if (loading && !product) {
//     return (
//       <div className="pt-32 text-center text-gray-400 animate-pulse">
//         Loading product...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="pt-32 text-center text-gray-500">
//         Product not found
//       </div>
//     );
//   }

//   const ingredients = product.clean_ingreds?.split(",");

//   return (
//     <div className="min-h-screen bg-[#fdf0f5] pt-24 px-6">
//       <div className="max-w-6xl mx-auto">

//         <button
//           onClick={() => window.history.back()}
//           className="mb-6  
//             px-3 py-1.5
//             rounded-full
//             border border-[#f0aecf]
//             bg-white/70
//             backdrop-blur
//             text-[#c0508a]
//             hover:bg-[#fdf0f5]
//             transition"
//         >
//           ← Back
//         </button>

//         <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-lg p-8">

//           {/* IMAGE */}
//           <div className="flex items-center justify-center group">
//             <img
//               src={`http://localhost:8000/media/${product.url}`}
//               alt={product.product_name}
//               className="w-full max-w-md object-contain transition-transform duration-500 group-hover:scale-105"
//             />
//           </div>

//           {/* INFO */}
//           <div className="flex flex-col gap-6">

//             <h1 className="text-3xl font-bold text-[#2d1a28] leading-snug">
//               {product.product_name}
//             </h1>

//             <span className="w-fit px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-600 font-medium">
//               {product.product_type}
//             </span>

//             <p className="text-2xl font-semibold text-[#e07aab]">
//               ${product.price}
//             </p>

//             <p className="text-[#6a4a5c] leading-relaxed">
//               A high-quality skincare product designed to support your skin
//               routine with carefully selected ingredients.
//             </p>

//             <button className="mt-2 bg-[#e07aab] text-white font-semibold py-3 rounded-xl hover:bg-[#c0508a] transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md">
//               Add to Cart
//             </button>

//           </div>
//         </div>

//         {/* INGREDIENTS */}
//         {ingredients && (
//           <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
//             <h2 className="text-xl font-semibold text-[#2d1a28] mb-4">
//               Ingredients
//             </h2>
//             <div className="grid md:grid-cols-2 gap-2 text-[#6a4a5c]">
//               {ingredients.map((item: string, index: number) => (
//                 <span
//                   key={index}
//                   className="bg-[#fdf0f5] px-3 py-2 rounded-lg text-sm"
//                 >
//                   {item.trim()}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;




import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useProducts } from "../../hooks/useproduct";
import useCart from "../../hooks/usecart";
import type { Product } from "../../types/Product.type";

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
              src={`http://localhost:8000/media/${product.url}`}
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