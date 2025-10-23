import React from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import { useState } from "react";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";

const Home = () => {
  // Navbar blur kare k liye
  // const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePanel, setActivePanel] = useState("null");

  // useEffect(() => {
  //   const changeNavbar = () => {
  //     setIsScrolled(window.scrollY > 10);
  //   };
  //   window.addEventListener("scroll", changeNavbar);
  // }, []);

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

      {/* Banner */}
      <Banner />

      {/* Product */}
      <Products searchQuery={searchQuery} />

      {/* Cart tab */}
      <Cart activePanel={activePanel} closePanel={closePanel}/>

      {/* Wishlist */}
      <Wishlist activePanel={activePanel} closePanel={closePanel} />
    </div>
  );
};

export default Home;
