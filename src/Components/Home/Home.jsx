import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import SaleStickyBar from "../SaleStickyBar/SaleStickyBar";
import { HiArrowUp } from "react-icons/hi";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePanel, setActivePanel] = useState("null");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll detection for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button when scrolled down more than 300px
      if (currentScrollY > 100) {
        // Show button when scrolling down, hide when scrolling up
        if (currentScrollY > lastScrollY) {
          setShowBackToTop(true);
        } else {
          setShowBackToTop(false);
        }
      } else {
        setShowBackToTop(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // search to product section
  const handleScrollToProducts = () => {
    const section = document.getElementById("products-section");
    if (section) {
      section.scrollIntoView({ behaviour: "smooth" });
    }
  };

  //  Cart & Wishlist show panel function
  const handlePanel = (tabName) => {
    setActivePanel((prev) => (prev === tabName ? null : tabName));
  }; 

  // cart & wishlist hide panel function
  const  closePanel=()=>setActivePanel(null)

  return (
    <div>
      {/* Navbar */}
      <Navbar
        handleScrollToProducts={handleScrollToProducts}
        setSearchQuery={setSearchQuery}
        handlePanel={handlePanel}
      />

      {/* Sale Sticky bar */}
      <SaleStickyBar/>

      {/* Banner */}
      <Banner />

      {/* Product */}
      <Products searchQuery={searchQuery} />

      {/* Cart tab */}
      <Cart activePanel={activePanel} closePanel={closePanel}/>

      {/* Wishlist */}
      <Wishlist activePanel={activePanel} closePanel={closePanel} />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-500 transform ${
          showBackToTop 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <HiArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Home;
