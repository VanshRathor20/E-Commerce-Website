import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // -- STATE FROM HOME.JSX --
  const safeParse = (value, fallback = []) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (e) {
      return fallback;
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [activePanel, setActivePanel] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [showOrderPlace, setShowOrderPlace] = useState(false);

  const [cart, setCart] = useState(()=>{
    const savestCart = localStorage.getItem('cart');
    return savestCart ? JSON.parse(savestCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    return safeParse(localStorage.getItem("wishlist"));
  });

  useEffect(()=>{ localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(()=>{ localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  // -- ACTIONS --
  const handlePanel = (tabName) => setActivePanel(prev => prev === tabName ? null : tabName);
  const closePanel = () => setActivePanel(null);
  
  const AddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  };
  const removeFromWishlist = (productId) => setWishlist(prev => prev.filter(p => p.id !== productId));
  const clearWishlist = () => setWishlist([]);

  const totalItem = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleScrollToProducts = () => {
    const section = document.getElementById("products-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      <Navbar
        handleScrollToProducts={handleScrollToProducts}
        setSearchQuery={setSearchQuery}
        handlePanel={handlePanel}
        totalItem={totalItem}
        wishlist={wishlist}
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} AddToCart={AddToCart} addToWishlist={addToWishlist} wishlist={wishlist} />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail AddToCart={AddToCart} addToWishlist={addToWishlist} wishlist={wishlist} />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals */}
      <Cart activePanel={activePanel} closePanel={closePanel} cart={cart} setCart={setCart} setOrderSummary={setOrderSummary} />
      <Wishlist activePanel={activePanel} closePanel={closePanel} wishlist={wishlist} removeFromWishlist={removeFromWishlist} clearWishlist={clearWishlist} AddToCart={AddToCart} />

      {orderSummary && (
        <OrderSummary cart={cart} subtotal={subtotal} shippingFee={50} orderTotal={subtotal + 50} closePanel={() => setOrderSummary(false)} onPlaceOrder={() => { setShowOrderPlace(true); setOrderSummary(false); }} />
      )}
      {showOrderPlace && (
        <OrderPlace subtotal={subtotal + 50} onClose={() => setShowOrderPlace(false)} onPaymentSuccess={() => { setCart([]); setShowOrderPlace(false); alert("Order placed!"); }} />
      )}
    </div>
  );
};

export default App;