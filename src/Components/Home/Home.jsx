import React, { useState, useEffect } from "react";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import SaleStickyBar from "../SaleStickyBar/SaleStickyBar";

const Home = () => {
  return (
    <>
      <SaleStickyBar />
      <Banner />
      <div className="w-full bg-[#FFFFFF]">
        <Products />
      </div>
    </>
  );
};

export default Home;
