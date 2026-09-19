// import React, { useMemo } from 'react';
// import SearchBar from '../../../component/shared/SearchBar';
// import FilterPanel from '../../../component/shared/FilterPanel';
// import SearchResults from './component/SearchResult';
// import { useProducts } from '../../../hooks/useproduct';
// import { useSearchStore } from '../../../store/searchStore';

// const SearchPage: React.FC = () => {

//   const { products, loading, error } = useProducts();

//   const {
//     filters,
//     setSearch,
//     setProductType,
//     setPriceRange,
//     setOrdering,
//     resetFilters
//   } = useSearchStore();

  

//   const chips = useMemo(() => {
//     const list: { label: string; onRemove: () => void }[] = [];

//     if (filters.search)
//       list.push({ label: `🔍 "${filters.search}"`, onRemove: () => setSearch('') });

//     if (filters.product_type !== 'All')
//       list.push({
//         label: `🏷️ ${filters.product_type}`,
//         onRemove: () => setProductType('All')
//       });

//     if (filters.price__gte || filters.price__lte)
//       list.push({
//         label: `💰 $${filters.price__gte || '0'} – $${filters.price__lte || '∞'}`,
//         onRemove: () => setPriceRange()
//       });

//     if (filters.ordering)
//       list.push({
//         label: filters.ordering === 'price' ? '↑ تصاعدي' : '↓ تنازلي',
//         onRemove: () => setOrdering()
//       });

//     return list;

//   }, [filters, setSearch, setProductType, setPriceRange, setOrdering]);

//   return (
//     <div className="min-h-screen bg-[#fdf0f5] pt-20 px-4 md:px-8">

//       {/* Page header */}
//       <div className="max-w-screen-2xl mx-auto mb-6">
//         <h1 className="mt-[20px] font-['Playfair_Display'] text-3xl text-[#2d1a28] italic">
//           اكتشفي <span className="text-[#e07aab]">روتينك</span> المثالي
//         </h1>
//         <p className="text-sm text-[#9e6e8a] mt-1">
//           ابحثي بالاسم أو المكوّن أو النوع
//         </p>
//       </div>

//       {/* Search bar */}
//       <div className="max-w-screen-2xl mx-auto mb-4">
//         <SearchBar />
//       </div>

//       {/* Active filter chips */}
//       {chips.length > 0 && (
//         <div className="max-w-screen-2xl mx-auto mb-4 flex flex-wrap gap-2 items-center">
//           {chips.map((chip) => (
//             <span
//               key={chip.label}
//               className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[rgba(248,215,232,0.7)] border border-[rgba(240,174,207,0.5)] text-[#c0508a]"
//             >
//               {chip.label}

//               <button
//                 onClick={chip.onRemove}
//                 className="w-4 h-4 rounded-full bg-[#e07aab] text-white text-[9px] flex items-center justify-center hover:bg-[#c0508a] transition-colors"
//               >
//                 ✕
//               </button>

//             </span>
//           ))}

//           <button
//             onClick={resetFilters}
//             className="text-xs text-[#9e6e8a] hover:text-[#c0508a] transition-colors underline underline-offset-2"
//           >
//             مسح الكل
//           </button>
//         </div>
//       )}

//       {/* Layout */}
//       <div className="max-w-screen-2xl mx-auto flex gap-6 items-start pb-12">

//         <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-20">
//           <FilterPanel />
//         </aside>

//         <main className="flex-1 min-w-0">
//           <SearchResults
//             products={products}
//             loading={loading}
//             error={error}
//               totalCount={products.length}
//           />
//         </main>

//       </div>
//     </div>
//   );
// };

// export default SearchPage;