import React from 'react';
import { HeroBanner } from './component/HeroBanner';
import { FeaturedProducts } from './component/FeaturedProducts';
import { AboutSection } from './component/AboutSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
      <AboutSection />
    </>
  );
};