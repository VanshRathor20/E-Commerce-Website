import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShopClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        handleScrollToProducts();
      }, 500);
    } else {
      handleScrollToProducts();
    }
  };

  const navLinks = [
    { name: "SHOP", path: "/" },
    { name: "COLLECTIONS", path: "/collections" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" }
  ];

  return (
    <>
      <header
        className={`bg-white sticky top-0 left-0 right-0 z-[1000] transition-shadow duration-300 ${
          isScrolled ? "shadow-sm border-b border-[#E1E1E1]" : "border-b border-[#E1E1E1]"
        }`}
      >
        <nav className="h-[80px] flex items-center justify-between w-full max-w-7xl mx-auto px-5 lg:px-10">
          
          <Link
            to="/"
            className="text-[#000000] font-bold uppercase text-2xl tracking-widest cursor-pointer whitespace-nowrap"
            onClick={() => window.scrollTo(0,0)}
          >
            FASHION STORE
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-x-8">
             {navLinks.map((link) => (
                link.name === "SHOP" ? (
                  <a 
                    key={link.name} 
                    href="/" 
                    className="text-[13px] uppercase tracking-[0.1em] text-[#000000] hover:text-[#757575] transition-colors relative group font-semibold"
                    onClick={handleShopClick}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#757575] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className="text-[13px] uppercase tracking-[0.1em] text-[#000000] hover:text-[#757575] transition-colors relative group font-semibold"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#757575] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
             ))}
          </div>

          {/* Nav Actions */}
          <div className="hidden md:flex justify-end gap-x-6 items-center flex-1">
            <div className="flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center border-b border-[#E1E1E1] pb-1 animate-fade-in">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="SEARCH"
                    autoFocus
                    onBlur={() => { setTimeout(() => setIsSearchOpen(false), 200) }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 text-[13px] focus:outline-none uppercase tracking-widest placeholder:text-[#757575] text-[#000000] bg-transparent"
                  />
                  <IoSearchSharp className="text-xl text-[#000000] cursor-pointer" />
                </div>
              ) : (
                <IoSearchSharp 
                  className="text-[22px] text-[#000000] cursor-pointer hover:text-[#757575] transition-colors" 
                  onClick={() => setIsSearchOpen(true)}
                />
              )}
            </div>

            <button 
              className="relative text-[22px] text-[#000000] cursor-pointer hover:text-[#757575] transition-colors flex items-center"
              onClick={() => handlePanel("wishlist")}
            >
              {wishlist && wishlist.length > 0 ? <GoHeartFill /> : <GoHeart />}
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#000000] rounded-full w-4 h-4 text-[#FFFFFF] flex justify-center items-center text-[10px] font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              className="relative text-[22px] text-[#000000] cursor-pointer hover:text-[#757575] transition-colors flex items-center"
              onClick={() => handlePanel("cart")}
            >
              {totalItem > 0 ? <HiShoppingBag /> : <HiOutlineShoppingBag />}
              {totalItem > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#000000] rounded-full w-4 h-4 text-[#FFFFFF] flex justify-center items-center text-[10px] font-bold">
                  {totalItem}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-x-5 md:hidden">
            <IoSearchSharp 
              className="text-2xl text-[#000000] cursor-pointer" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-2xl text-[#000000] cursor-pointer"
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </nav>

        {isSearchOpen && (
          <div className="md:hidden w-full bg-white px-5 py-4 border-t border-[#E1E1E1]">
             <div className="flex items-center border border-[#E1E1E1] p-2">
                <input
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 focus:outline-none text-[13px] tracking-widest uppercase bg-transparent p-1 text-[#000000]"
                />
             </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden w-full bg-white border-t border-[#E1E1E1] flex flex-col uppercase tracking-widest text-[13px]">
             {navLinks.map((link) => (
                link.name === "SHOP" ? (
                  <button 
                    key={link.name}
                    className="w-full text-left py-4 px-5 border-b border-[#E1E1E1] hover:bg-gray-50 text-[#000000] font-bold"
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleShopClick(e);
                    }}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link 
                    key={link.name}
                    to={link.path}
                    className="w-full text-left py-4 px-5 border-b border-[#E1E1E1] hover:bg-gray-50 text-[#000000] font-bold block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
             ))}
             
             <div className="flex items-center justify-around py-5">
               <button 
                  className="flex flex-col items-center gap-2 hover:text-[#757575] text-[#000000]"
                  onClick={() => { handlePanel("wishlist"); setIsMobileMenuOpen(false); }}
               >
                  <div className="relative text-2xl">
                     {wishlist && wishlist.length > 0 ? <GoHeartFill /> : <GoHeart />}
                     {wishlist && wishlist.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#000000] rounded-full w-4 h-4 text-[#FFFFFF] flex justify-center items-center text-[10px] font-bold">
                          {wishlist.length}
                        </span>
                     )}
                  </div>
                  <span className="text-[10px] font-bold">WISHLIST</span>
               </button>

               <button 
                  className="flex flex-col items-center gap-2 hover:text-[#757575] text-[#000000]"
                  onClick={() => { handlePanel("cart"); setIsMobileMenuOpen(false); }}
               >
                  <div className="relative text-2xl">
                     {totalItem > 0 ? <HiShoppingBag /> : <HiOutlineShoppingBag />}
                     {totalItem > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#000000] rounded-full w-4 h-4 text-[#FFFFFF] flex justify-center items-center text-[10px] font-bold">
                          {totalItem}
                        </span>
                     )}
                  </div>
                  <span className="text-[10px] font-bold">CART</span>
               </button>
             </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
