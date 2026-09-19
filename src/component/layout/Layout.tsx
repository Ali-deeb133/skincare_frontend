// import React from 'react';
// import { Navbar } from './Navbar';
// import { Footer } from './Footer';
// import { Outlet } from 'react-router-dom';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <>
//       <Navbar />
//       <main>{children}</main>
//       <Outlet />
//       <Footer />
//     </>
//   );
// };



import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};