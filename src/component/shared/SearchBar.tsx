import React, { useState } from 'react';
import { useSearchStore } from '../../store/searchStore';

const SearchBar: React.FC = () => {
  const { filters, setSearch } = useSearchStore();
  const [local, setLocal] = useState<string>(filters.search ?? '');

  // useEffect(() => {
  //   setLocal(filters.search ?? '');
  // }, [filters.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(local.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e07aab] pointer-events-none text-lg">
        🔍
      </span>

      <input
        dir="rtl"
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder='Search by name, ingredient, or type...'
        className="
          w-full bg-white border-2 border-[rgba(240,174,207,0.4)] rounded-2xl
          py-3.5 pr-12 pl-5 text-sm text-[#2d1a28] placeholder:text-[#9e6e8a]
          outline-none transition-all duration-250
          focus:border-[#e07aab] focus:shadow-[0_0_0_4px_rgba(224,122,171,0.1)]
          shadow-[0_4px_20px_rgba(224,122,171,0.1)]
        "
      />
    </form>
  );
};

export default SearchBar;