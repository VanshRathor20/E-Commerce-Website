import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import OrderSummary from "./Components/OrderSummary/OrderSummary";

import Home from "./pages/Home/Home";
import Collections from "./pages/Collections/Collections";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

import { useStore } from "./context/StoreContext";

const App = () => {
  const { state } = useStore();
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Scroll to top on route change & fade transition simulation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      {state.activePanel === "summary" && <OrderSummary />}

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            zIndex: 99999,
            width: "44px",
            height: "44px",
            backgroundColor: "#000000",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "0",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#575757")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#000000")}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default App;
