import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import OrderSummary from "./Components/OrderSummary/OrderSummary";
import OrderPlace from "./Components/OrderPlace/OrderPlace";

import Home from './Components/Home/Home';
import Collections from './Components/Collections/Collections';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import ProductDetail from './Components/ProductDetail/ProductDetail';

import { useStore } from './context/StoreContext';

const App = () => {
  const { state, dispatch } = useStore();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Scroll to top on route change & fade transition simulation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const subtotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen relative bg-[#FFFFFF]">
      <Navbar />

      <main className="flex-1 animate-fade-in-up" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals */}
      <Cart />
      <Wishlist />
      
      {state.activePanel === 'summary' && (
        <OrderSummary 
          cart={state.cart} 
          subtotal={subtotal} 
          shippingFee={50} 
          orderTotal={subtotal + 50} 
          closePanel={() => dispatch({ type: 'SET_PANEL', payload: null })} 
          onPlaceOrder={() => dispatch({ type: 'SET_PANEL', payload: 'checkout' })} 
        />
      )}
      
      {state.activePanel === 'checkout' && (
        <OrderPlace 
          subtotal={subtotal + 50} 
          onClose={() => dispatch({ type: 'SET_PANEL', payload: null })} 
        />
      )}
    </div>
  );
};

export default App;