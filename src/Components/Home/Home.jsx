import React, { useState, useEffect } from "react";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import SaleStickyBar from "../SaleStickyBar/SaleStickyBar";
import { HiArrowUp } from "react-icons/hi";

const Home = ({ searchQuery, AddToCart, addToWishlist, wishlist }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SaleStickyBar />
      <Banner />
      <div className="w-full bg-[#FFFFFF]">
        <Products
          searchQuery={searchQuery}
          AddToCart={AddToCart}
          addToWishlist={addToWishlist}
          wishlist={wishlist}
        />
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 bg-fashion-black hover:bg-[#575757] text-fashion-white p-3 rounded-none shadow-lg transition-all duration-500 transform ${
          showBackToTop
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <HiArrowUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default Home;
