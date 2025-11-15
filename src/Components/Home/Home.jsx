import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import SaleStickyBar from "../SaleStickyBar/SaleStickyBar";
import { HiArrowUp } from "react-icons/hi";
import OrderSummary from "../OrderSummary/OrderSummary";
import OrderPlace from "../OrderPlace/OrderPlace";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activePanel, setActivePanel] = useState("null");
  // track whether the order summary modal is visible
  const [orderSummary, setOrderSummary] = useState(false);
  const [cart, setCart] = useState([]);
  // show OrderPlace (payment) view after clicking Place Order
  const [showOrderPlace, setShowOrderPlace] = useState(false);
  const [wishlist,setWishlist]=useState([]);

  // Scroll detection for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show button when scrolled down more than 300px
      if (currentScrollY > 100) {
        // Show button when scrolling down, hide when scrolling up
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

  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
  const closePanel = () => setActivePanel(null);

  // Add to Cart Function
  const AddToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // If exists, increase quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new product, add with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // total item badhe in navbar
  const totalItem = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Navbar */}
      <Navbar
        handleScrollToProducts={handleScrollToProducts}
        setSearchQuery={setSearchQuery}
        handlePanel={handlePanel}
        totalItem={totalItem}
      />

      {/* Sale Sticky bar */}
      <SaleStickyBar />

      {/* Banner */}
      <Banner />

      {/* Product */}
      <Products searchQuery={searchQuery} AddToCart={AddToCart} />

      {/* Cart tab */}
      <Cart
        activePanel={activePanel}
        closePanel={closePanel}
        cart={cart}
        setCart={setCart}
        setOrderSummary={setOrderSummary}
      />

      {/* Wishlist */}
      <Wishlist activePanel={activePanel} closePanel={closePanel} />

      {/* Order Summary */}
      {orderSummary && (
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          shippingFee={50}
          orderTotal={subtotal + 50}
          closePanel={() => setOrderSummary(false)}
          onPlaceOrder={() => {
             setShowOrderPlace(true);  
              setOrderSummary(false);
            }}
            
        />
      )}
      {showOrderPlace && (
        <OrderPlace
          subtotal={subtotal + 50}
          onClose={() => setShowOrderPlace(false)}
          onPaymentSuccess={() => {
            // clear cart and hide payment UI after successful payment
            setCart([]);
            setShowOrderPlace(false);
            alert("Order placed successfully!");
          }}
        />
      )}
  {/* Order Placement (payment) - shown after clicking Place Order */}


      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-500 transform ${
          showBackToTop
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <HiArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Home;
