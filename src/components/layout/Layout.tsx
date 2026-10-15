import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartSync } from './CartSync';
import { SlowServerToast } from './SlowServerToast';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {
  const { pathname } = useLocation();

  // Start every page at the top; without this a link clicked low on a page
  // (e.g. in the footer) opens the next page already scrolled down.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <CartSync />
      <SlowServerToast />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
