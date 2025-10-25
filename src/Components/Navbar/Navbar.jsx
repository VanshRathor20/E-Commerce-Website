import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { IoSearchSharp } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({
  handleScrollToProducts,
  setSearchQuery,
  handlePanel,
  totalItem,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div>
        <header
          className={`bg-white top-0 fixed left-0 right-0 z-50 transition-shadow duration-300 ${
            isScrolled ? "shadow-md" : "shadow-none"
          }`}
        >
          <nav className="h-auto py-3 sm:py-4 flex items-center justify-between w-full px-4 sm:px-6 lg:px-12">
            {/* Logo */}
            <a
              href="#"
              className="flex flex-wrap w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 pointer-cursor"
            >
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </a>

            {/* Desktop Nav Actions */}
            <div className="hidden lg:flex justify-center gap-x-5 items-center">
              {/* Search bar */}
              <div className="p-1 rounded-full border-2 border-blue-600 flex items-center justify-center">
                <input
                  type="text"
                  name="search"
                  id="search"
                  autoComplete="off"
                  placeholder="Search"
                  onFocus={handleScrollToProducts}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  className="h-[5vh] flex-1 focus:outline-none p-3 rounded-full"
                />

                <button className="w-10 h-10 rounded-full bg-blue-600 text-white text-xl flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <IoSearchSharp />
                </button>
              </div>

              {/* Icons */}
              <button className="flex text-2xl text-zinc-800 cursor-pointer">
                {/* heart icon */}
                <GoHeartFill onClick={() => handlePanel("wishlist")} />
                <span
                  className="bg-red-600 rounded-full w-5 h-5 text-white flex justify-center items-center text-xl border-white border-2 ml-[-7px]"
                  onClick={() => handlePanel("wishlist")}
                >
                  0
                </span>

                {/* shopping bag icon */}
                <HiShoppingBag onClick={() => handlePanel("cart")} />
                {
                    totalItem>0 && <span
                    className="bg-red-600 rounded-full w-5 h-5 text-white flex justify-center items-center text-xl border-white border-2 ml-[-7px]"
                    onClick={() => handlePanel("cart")}
                  >
                    {totalItem}
                  </span>
                  }
                
              </button>
            </div>

            {/* Mobile Menu Button & Icons */}
            <div className="flex items-center gap-x-3 lg:hidden">
              {/* Mobile Icons */}
              <div className="flex items-center gap-x-2">
                <GoHeartFill
                  className="text-xl text-zinc-800 cursor-pointer"
                  onClick={() => handlePanel("wishlist")}
                />
                <HiShoppingBag
                  className="text-xl text-zinc-800 cursor-pointer"
                  onClick={() => handlePanel("cart")}
                />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-2xl text-zinc-800 cursor-pointer"
              >
                {isMobileMenuOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="p-1 rounded-full border-2 border-blue-600 flex items-center justify-center">
                  <input
                    type="text"
                    name="search-mobile"
                    id="search-mobile"
                    autoComplete="off"
                    placeholder="Search"
                    onFocus={handleScrollToProducts}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    className="h-10 flex-1 focus:outline-none p-3 rounded-full"
                  />

                  <button className="w-8 h-8 rounded-full bg-blue-600 text-white text-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                    <IoSearchSharp />
                  </button>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex flex-col space-y-3">
                <button
                  className="text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    handlePanel("wishlist");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Wishlist
                </button>
                <button
                  className="text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    handlePanel("cart");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Cart
                </button>
              </div>
            </div>
          )}
        </header>
      </div>
    </div>
  );
};

export default Navbar;
