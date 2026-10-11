import React from 'react';
import { HeroBanner } from './components/HeroBanner';
import { FeaturedProducts } from './components/FeaturedProducts';
import { AboutSection } from './components/AboutSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
      <AboutSection />
    </>
  );
};
