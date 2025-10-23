// import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { IoSearchSharp } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";

const Navbar = ({ handleScrollToProducts, setSearchQuery, handlePanel }) => {
  
  return (
    <div>
      <div>
        <header className="bg-white top-0 fixed left-0 right-0 ">
          <nav className="h-auto py-8 flex items-center justify-between w-full md:px-10 mx-auto px-6 lg:px-12">
            {/* logo */}
            <a
              href="#"
              className="flex flex-wrap md:w-15 md:h-15 w-13 h-13 pointer-cursor"
            >
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </a>


            {/* Nav Action */}
            <div className="flex justify-center gap-x-5 items-center">
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
                <GoHeartFill onClick={()=>
                  handlePanel('wishlist')
                }/>
                <span className="bg-red-600 rounded-full w-5 h-5 text-white flex justify-center items-center text-xl border-white border-2 ml-[-7px]" onClick={()=>handlePanel('wishlist')}>
                  1
                </span>

                {/* shopping bag icon */}
                <HiShoppingBag onClick={()=>
                  handlePanel('cart')
                }/>
                <span className="bg-red-600 rounded-full w-5 h-5 text-white flex justify-center items-center text-xl border-white border-2 ml-[-7px]" onClick={()=>handlePanel('cart')}>
                  1
                </span>
              </button>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
