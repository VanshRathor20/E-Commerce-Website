import React, { useState, useEffect } from "react";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import SaleStickyBar from "../SaleStickyBar/SaleStickyBar";
import { HiArrowUp } from "react-icons/hi";

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SaleStickyBar />
      <Banner />
      <div className="w-full bg-[#FFFFFF]">
        <Products />
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 bg-[#000000] hover:bg-[#575757] text-[#FFFFFF] p-4 rounded-full shadow-lg transition-all duration-300 transform flex items-center justify-center cursor-pointer ${
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
