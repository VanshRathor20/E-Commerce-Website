import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { HiShoppingBag, HiOutlineShoppingBag } from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({
  handleScrollToProducts,
  setSearchQuery,
  handlePanel,
  totalItem,
  wishlist = [],
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`bg-white sticky top-0 left-0 right-0 z-[1000] transition-shadow duration-300 ${
          isScrolled ? "shadow-sm border-b border-fashion-border" : "border-b border-fashion-border"
        }`}
      >
        <nav className="h-[80px] flex items-center justify-between w-full max-w-7xl mx-auto px-5 lg:px-10">
          
          {/* Logo (Text instead of Image) */}
          <a
            href="#"
            className="text-fashion-black font-bold uppercase text-2xl tracking-widest cursor-pointer whitespace-nowrap"
            onClick={(e) => { e.preventDefault(); window.scrollTo(0,0); }}
          >
            FASHION STORE
          </a>

          {/* Center Links (Desktop only) */}
          <div className="hidden lg:flex items-center gap-x-8">
             {["Shop", "Collections", "About", "Contact"].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-[13px] uppercase tracking-[0.1em] text-fashion-black hover:text-fashion-grey transition-colors relative group"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    if(link === "Shop") handleScrollToProducts(); 
                  }}
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-fashion-grey transition-all duration-300 group-hover:w-full"></span>
                </a>
             ))}
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden lg:flex justify-end gap-x-6 items-center flex-1">
            {/* Search Icon / Bar */}
            <div className="flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center border-b border-fashion-border pb-1 animate-fade-in">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="SEARCH"
                    autoFocus
                    onBlur={() => { setTimeout(() => setIsSearchOpen(false), 200) }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 text-[13px] focus:outline-none uppercase tracking-widest placeholder:text-fashion-grey text-fashion-black bg-transparent"
                  />
                  <IoSearchSharp className="text-xl text-fashion-black cursor-pointer" />
                </div>
              ) : (
                <IoSearchSharp 
                  className="text-[22px] text-fashion-black cursor-pointer hover:text-fashion-grey transition-colors" 
                  onClick={() => setIsSearchOpen(true)}
                />
              )}
            </div>

            {/* Heart Icon */}
            <button 
              className="relative text-[22px] text-fashion-black cursor-pointer hover:text-fashion-grey transition-colors flex items-center"
              onClick={() => handlePanel("wishlist")}
            >
              {wishlist.length > 0 ? <GoHeartFill /> : <GoHeart />}
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-fashion-black rounded-full w-4 h-4 text-fashion-white flex justify-center items-center text-[10px] font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button 
              className="relative text-[22px] text-fashion-black cursor-pointer hover:text-fashion-grey transition-colors flex items-center"
              onClick={() => handlePanel("cart")}
            >
              {totalItem > 0 ? <HiShoppingBag /> : <HiOutlineShoppingBag />}
              {totalItem > 0 && (
                <span className="absolute -top-2 -right-2 bg-fashion-black rounded-full w-4 h-4 text-fashion-white flex justify-center items-center text-[10px] font-bold">
                  {totalItem}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button & Icons */}
          <div className="flex items-center gap-x-5 lg:hidden">
            <IoSearchSharp 
              className="text-2xl text-fashion-black cursor-pointer" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-2xl text-fashion-black cursor-pointer"
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="lg:hidden w-full bg-white px-5 py-4 border-t border-fashion-border">
             <div className="flex items-center border border-fashion-border p-2">
                <input
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 focus:outline-none text-[13px] tracking-widest uppercase bg-transparent p-1"
                />
             </div>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full bg-white border-t border-fashion-border flex flex-col uppercase tracking-widest text-[13px]">
             {["Shop", "Collections", "About", "Contact"].map((link) => (
                <button 
                  key={link}
                  className="w-full text-left py-4 px-5 border-b border-fashion-border hover:bg-gray-50 text-fashion-black"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if(link === "Shop") handleScrollToProducts();
                  }}
                >
                  {link}
                </button>
             ))}
             
             <div className="flex items-center justify-around py-5">
               <button 
                  className="flex flex-col items-center gap-2 hover:text-fashion-grey"
                  onClick={() => { handlePanel("wishlist"); setIsMobileMenuOpen(false); }}
               >
                  <div className="relative text-2xl">
                     {wishlist.length > 0 ? <GoHeartFill /> : <GoHeart />}
                     {wishlist.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-fashion-black rounded-full w-4 h-4 text-fashion-white flex justify-center items-center text-[10px] font-bold">
                          {wishlist.length}
                        </span>
                     )}
                  </div>
                  <span className="text-[10px]">WISHLIST</span>
               </button>

               <button 
                  className="flex flex-col items-center gap-2 hover:text-fashion-grey"
                  onClick={() => { handlePanel("cart"); setIsMobileMenuOpen(false); }}
               >
                  <div className="relative text-2xl">
                     {totalItem > 0 ? <HiShoppingBag /> : <HiOutlineShoppingBag />}
                     {totalItem > 0 && (
                        <span className="absolute -top-1 -right-1 bg-fashion-black rounded-full w-4 h-4 text-fashion-white flex justify-center items-center text-[10px] font-bold">
                          {totalItem}
                        </span>
                     )}
                  </div>
                  <span className="text-[10px]">CART</span>
               </button>
             </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
