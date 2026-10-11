import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SearchBar from '../../components/shared/SearchBar';
import FilterPanel from '../../components/shared/FilterPanel';
import SearchResults from './components/SearchResults';
import ChatWindow from './components/ChatWindow';

import { useProducts } from '../../hooks/useProducts';
import { useSearchStore } from '../../store/searchStore';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const { products, loading, error } = useProducts();

  const { filters, setSearch, setProductType, setPriceRange, setOrdering, resetFilters } =
    useSearchStore();

  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatVisible(true);
    setTimeout(() => setIsChatOpen(true), 10);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setTimeout(() => setIsChatVisible(false), 1000);
  };

  useEffect(() => {
    if (location.state?.openChat) {
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => {
        setIsChatVisible(true);
        setTimeout(() => setIsChatOpen(true), 10);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const chips = useMemo(() => {
    const list: { label: string; onRemove: () => void }[] = [];

    if (filters.search)
      list.push({ label: `🔍 "${filters.search}"`, onRemove: () => setSearch('') });

    if (filters.product_type && filters.product_type !== 'All')
      list.push({
        label: `🏷️ ${filters.product_type}`,
        onRemove: () => setProductType('All'),
      });

    if (filters.price__gte || filters.price__lte)
      list.push({
        label: `💰 $${filters.price__gte || '0'} – $${filters.price__lte || '∞'}`,
        onRemove: () => setPriceRange(),
      });

    if (filters.ordering)
      list.push({
        label: filters.ordering === 'price' ? '↑ Ascending' : '↓ Descending',
        onRemove: () => setOrdering(),
      });

    return list;
  }, [filters, setSearch, setProductType, setPriceRange, setOrdering]);

  return (
    <div className="min-h-screen bg-sakura-base pt-30 px-4 md:px-8 relative">
      {/* Header */}
      <div className="max-w-screen-2xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-sakura-ink italic">
            Discover<span className="text-sakura-accent">Your</span> Ideal Routine
          </h1>
          <p className="text-sm text-sakura-muted mt-1">Search by name, ingredient, or type</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="max-w-screen-2xl mx-auto mb-4">
        <SearchBar />
      </div>

      {/* Filters */}
      {chips.length > 0 && (
        <div className="max-w-screen-2xl mx-auto mb-4 flex flex-wrap gap-2 items-center">
          {chips.map((chip, index) => (
            <span
              key={`${chip.label}-${index}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[rgba(248,215,232,0.7)] border border-[rgba(240,174,207,0.5)] text-sakura-dark"
            >
              {chip.label}
              <button
                onClick={chip.onRemove}
                aria-label={`Remove filter ${chip.label}`}
                className="w-4 h-4 rounded-full bg-sakura-accent text-white text-[9px] flex items-center justify-center hover:bg-sakura-dark transition-colors"
              >
                ✕
              </button>
            </span>
          ))}
          <button
            onClick={resetFilters}
            className="text-xs text-sakura-muted hover:text-sakura-dark underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Layout */}
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-6 items-start pb-12">
        <aside className="w-full lg:w-64 xl:w-72 lg:sticky lg:top-20">
          <FilterPanel />
        </aside>
        <section aria-label="Search results" className="flex-1 min-w-0">
          <SearchResults
            products={products}
            loading={loading}
            error={error}
            totalCount={products.length}
          />
        </section>
      </div>

      {/* Overlay */}
      {isChatOpen && (
        <div onClick={closeChat} className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40" />
      )}

      {/* Chat Button */}
      <button
        onClick={openChat}
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-sakura-accent to-sakura-dark text-white text-xl shadow-lg hover:scale-105 transition z-50"
      >
        💬
      </button>

      {/* Chat Window */}
      {isChatVisible && <ChatWindow isOpen={isChatOpen} onClose={closeChat} />}
    </div>
  );
};

export default SearchPage;
