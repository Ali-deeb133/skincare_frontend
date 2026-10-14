import React from 'react';
import { FeaturedProductCard } from '../../../components/shared/FeaturedProductCard';
import { type FeaturedProduct } from '../../../types/home.types';
import { useReveal } from '../../../hooks/useReveal';
import niacinamidImg from '../../../assets/image/nia3.jpg';
import hyaa from '../../../assets/image/hya1.jpg';
import retinol from '../../../assets/image/rita1.jpg';

const products: FeaturedProduct[] = [
  {
    id: 1,
    subtitle: 'Pore Minimizer Serum',
    name: 'Niacinamide 10%',
    description:
      'Reduces pores, controls oil & evens skin tone with 10% Niacinamide + 1% Zinc — your daily dose of clarity.',
    price: 28,
    badge: 'BEST SELLER',
    image: niacinamidImg,
    gradient: 'from-[#fff0f5] to-primary-soft',
    delay: '0.05s',
    searchTerm: 'niacinamide',
  },
  {
    id: 2,
    subtitle: 'Deep Hydration Serum',
    name: 'Hyaluronic Acid',
    description:
      'Multi-weight HA complex draws moisture deep into skin layers for plump, dewy hydration that lasts 72 hours.',
    price: 32,
    badge: 'NEW',
    image: hyaa,
    gradient: 'from-primary-soft to-primary-blush',
    delay: '0.15s',
    searchTerm: 'hyaluronic',
  },
  {
    id: 3,
    subtitle: 'Anti-Aging Night Serum',
    name: 'Retinol 0.5%',
    description:
      'Encapsulated retinol with peptide complex — visibly reduces fine lines and restores luminosity overnight.',
    price: 45,
    badge: 'CLINICAL',
    image: retinol,
    gradient: 'from-[#fdf2f8] to-[#f3e5f5]',
    delay: '0.25s',
    searchTerm: 'retinol',
  },
];

export const FeaturedProducts: React.FC = () => {
  const titleRef = useReveal();

  return (
    <section className="px-5 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-25 bg-white">
      <div ref={titleRef as React.RefObject<HTMLDivElement>} className="text-center reveal">
        <div className="text-[11px] tracking-widest text-primary font-bold uppercase mb-3.5">
          ✦ Our Formulas
        </div>
        <h2 className="font-serif text-[clamp(36px,4vw,60px)] font-bold text-plum leading-[1.1]">
          Clinical Actives,
          <br />
          <em className="text-primary not-italic">Pure Results</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-[1200px] mx-auto mt-10 sm:mt-14">
        {products.map((product) => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
