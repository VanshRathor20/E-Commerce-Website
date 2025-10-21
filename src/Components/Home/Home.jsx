import React from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import { useState } from "react";

const Home = () => {
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const changeNavbar = () => {
  //     setIsScrolled(window.scrollY > 10);
  //   };
  //   window.addEventListener("scroll", changeNavbar);
  // }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleScrollToProducts = () => {
    const section = document.getElementById("products-section");
    if (section) {
      section.scrollIntoView({ behaviour: "smooth" });
    }
  };
  return (
    <div>
      <Navbar
        handleScrollToProducts={handleScrollToProducts}
        setSearchQuery={setSearchQuery
          // isScrolled={isScrolled }
        }
      />
      <Banner />
      <Products searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
