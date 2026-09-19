


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './component/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage, RegisterPage } from './pages/AuthPage';
import FullPage from './pages/Searchandchat/FullPage';
import ProductDetailPage from './pages/Searchandchat/ProductDetailPage';
import CartPage from './pages/CartPage/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* بدون Layout */}
       
        
        
         

        {/* مع Layout */}
        <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/search" element={<FullPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
       
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;