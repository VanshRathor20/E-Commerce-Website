import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { HiShoppingBag, HiOutlineShoppingBag } from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";
import { useStore } from "../../context/StoreContext";

const Navbar = () => {
  const { state, dispatch } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const totalItem = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToProducts = () => {
    const section = document.getElementById("products-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

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
        className={`bg-[#FFFFFF] sticky top-0 left-0 right-0 z-[1000] transition-all duration-300 border-b border-[#E1E1E1] ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="h-[64px] flex items-center justify-between w-full mx-auto px-6 lg:px-12 relative">
          
          <Link
            to="/"
            className="text-[#000000] font-[900] uppercase text-[18px] tracking-[0.08em] cursor-pointer whitespace-nowrap"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            FASHION STORE
          </Link>

          {/* Desktop Nav Links (Absolutely Centered) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-x-8">
             {navLinks.map((link) => (
                link.name === "SHOP" ? (
                  <a 
                    key={link.name} 
                    href="/" 
                    className="text-[12px] uppercase tracking-[0.12em] text-[#000000] hover:text-[#757575] transition-all duration-300 relative group font-[500]"
                    onClick={handleShopClick}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#000000] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className="text-[12px] uppercase tracking-[0.12em] text-[#000000] hover:text-[#757575] transition-all duration-300 relative group font-[500]"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#000000] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
             ))}
          </div>

          {/* Nav Actions */}
          <div className="hidden md:flex justify-end gap-x-6 items-center">
            <div className="flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center border-b border-[#000000] pb-1 animate-fade-in">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="SEARCH"
                    autoFocus
                    onBlur={() => { setTimeout(() => setIsSearchOpen(false), 200) }}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                    className="w-40 text-[12px] focus:outline-none uppercase tracking-[0.1em] placeholder:text-[#757575] text-[#000000] bg-transparent"
                  />
                  <IoSearchSharp className="text-[20px] text-[#000000] cursor-pointer stroke-[1.5]" />
                </div>
              ) : (
                <IoSearchSharp 
                  className="text-[20px] text-[#000000] cursor-pointer hover:text-[#757575] transition-colors stroke-[1.5]" 
                  onClick={() => setIsSearchOpen(true)}
                />
              )}
            </div>

            <button 
              className="relative text-[20px] text-[#000000] cursor-pointer hover:text-[#757575] transition-colors flex items-center stroke-[1.5]"
              onClick={() => dispatch({ type: 'SET_PANEL', payload: 'wishlist' })}
            >
              {state.wishlist.length > 0 ? <GoHeartFill /> : <GoHeart />}
              {state.wishlist.length > 0 && (
                <span className="absolute -top-[8px] -right-[8px] bg-[#000000] border-2 border-[#FFFFFF] rounded-full w-[18px] h-[18px] text-[#FFFFFF] flex justify-center items-center text-[10px] font-[600] font-inter tracking-normal">
                  {state.wishlist.length}
                </span>
              )}
            </button>

            <button 
              className={`relative text-[20px] text-[#000000] cursor-pointer hover:text-[#757575] transition-all duration-300 flex items-center stroke-[1.5] ${state.cartAddedPulse ? 'scale-125' : 'scale-100'}`}
              onClick={() => dispatch({ type: 'SET_PANEL', payload: 'cart' })}
            >
              {totalItem > 0 ? <HiShoppingBag /> : <HiOutlineShoppingBag />}
              {totalItem > 0 && (
                <span className="absolute -top-[8px] -right-[8px] bg-[#000000] border-2 border-[#FFFFFF] rounded-full w-[18px] h-[18px] text-[#FFFFFF] flex justify-center items-center text-[10px] font-[600] font-inter tracking-normal">
                  {totalItem}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-x-5 md:hidden">
            <IoSearchSharp 
              className="text-[20px] text-[#000000] cursor-pointer stroke-[1.5]" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[20px] text-[#000000] cursor-pointer stroke-[1.5]"
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </nav>

        {isSearchOpen && (
          <div className="md:hidden w-full bg-[#FFFFFF] px-6 py-4 border-t border-[#E1E1E1]">
             <div className="flex items-center border border-[#000000] p-2">
                <input
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                  className="flex-1 focus:outline-none text-[12px] tracking-[0.1em] uppercase bg-transparent p-1 text-[#000000]"
                />
             </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden w-full bg-[#FFFFFF] border-t border-[#E1E1E1] flex flex-col uppercase tracking-[0.12em] text-[12px]">
             {navLinks.map((link) => (
                link.name === "SHOP" ? (
                  <button 
                    key={link.name}
                    className="w-full text-left py-4 px-6 border-b border-[#E1E1E1] hover:bg-[#F9F9F9] text-[#000000] font-[500] transition-colors"
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
                    className="w-full text-left py-4 px-6 border-b border-[#E1E1E1] hover:bg-[#F9F9F9] text-[#000000] font-[500] block transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
             ))}
             
             <div className="flex items-center justify-around py-6 bg-[#F9F9F9]">
               <button 
                  className="flex flex-col items-center gap-2 hover:text-[#757575] text-[#000000] transition-colors"
                  onClick={() => { dispatch({ type: 'SET_PANEL', payload: 'wishlist' }); setIsMobileMenuOpen(false); }}
               >
                  <div className="relative text-[20px] stroke-[1.5]">
                     {state.wishlist.length > 0 ? <GoHeartFill /> : <GoHeart />}
                     {state.wishlist.length > 0 && (
                        <span className="absolute -top-[8px] -right-[8px] bg-[#000000] border-2 border-[#FFFFFF] rounded-full w-[18px] h-[18px] text-[#FFFFFF] flex justify-center items-center text-[10px] font-[600] font-inter tracking-normal">
                          {state.wishlist.length}
                        </span>
                     )}
                  </div>
                  <span className="text-[10px] font-bold">WISHLIST</span>
               </button>

               <button 
                  className={`flex flex-col items-center gap-2 hover:text-[#757575] text-[#000000] transition-all duration-300 ${state.cartAddedPulse ? 'scale-125' : 'scale-100'}`}
                  onClick={() => { dispatch({ type: 'SET_PANEL', payload: 'cart' }); setIsMobileMenuOpen(false); }}
               >
                  <div className="relative text-[20px] stroke-[1.5]">
                     {totalItem > 0 ? <HiShoppingBag /> : <HiOutlineShoppingBag />}
                     {totalItem > 0 && (
                        <span className="absolute -top-[8px] -right-[8px] bg-[#000000] border-2 border-[#FFFFFF] rounded-full w-[18px] h-[18px] text-[#FFFFFF] flex justify-center items-center text-[10px] font-[600] font-inter tracking-normal">
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
