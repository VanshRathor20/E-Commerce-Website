import React, { useState, useEffect, useMemo } from "react";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

const Products = () => {
  const { state, dispatch } = useStore();
  const { searchQuery, wishlist } = state;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [activeTab, setActiveTab] = useState("All");
  const [addedItems, setAddedItems] = useState({});

  const normalizeProduct = (item) => ({
    ...item,
    name: item.title,
    image: item.thumbnail,
  });

  const fetchProducts = async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://dummyjson.com/products?limit=12", {
        signal,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch products (HTTP ${response.status})`);
      }

      const data = await response.json();
      const normalizedProducts = (data.products || []).map(normalizeProduct);

      setProducts(normalizedProducts);
      const uniqueCategories = [
        "All",
        ...new Set(normalizedProducts.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong while loading products.");
      }
    } finally {
      // Small timeout to show off CSS shimmer during dev if needed, or just let it snap
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((item) => {
        const matchesCategory =
          activeTab === "All" || item.category === activeTab;
        const matchesSearch =
          typeof searchQuery === "string" && searchQuery.trim() !== ""
            ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
      }),
    [products, activeTab, searchQuery],
  );

  const isInWishlist = (product) => wishlist.some((p) => p.id === product.id);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleClearFilters = () => {
    setActiveTab("All");
    dispatch({ type: "SET_SEARCH", payload: "" });
  };

  if (error) {
    return (
      <section id="products-section" className="section-wrapper w-full max-w-[1280px] mx-auto">
         <div className="border border-[#E1E1E1] p-[60px] flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full border-[3px] border-[#000000] text-[#000000] flex items-center justify-center text-[32px] font-bold mb-6">
              !
            </div>
            <h2 className="text-[#000000] font-bold uppercase text-[24px] tracking-[0.1em] mb-2">SOMETHING WENT WRONG</h2>
            <p className="text-[#757575] text-[15px] mb-8 uppercase tracking-widest">We couldn't load products. Please try again.</p>
            <button
               onClick={() => fetchProducts()}
               className="bg-[#000000] hover:bg-[#575757] text-[#FFFFFF] uppercase font-bold tracking-[0.1em] text-[13px] px-10 py-[16px] rounded-none transition-colors"
            >
               TRY AGAIN
            </button>
         </div>
      </section>
    );
  }

  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, idx) => (
      <div key={idx} className="flex flex-col border border-transparent">
        <div className="w-full aspect-[3/4] skeleton-shimmer mb-4"></div>
        <div className="w-3/4 h-[16px] skeleton-shimmer mb-3 mx-auto"></div>
        <div className="w-1/2 h-[14px] skeleton-shimmer mx-auto"></div>
      </div>
    ));
  };

  const renderProducts = () => {
    return filteredProducts.map((i, idx) => {
      const oldPrice = i.price / (1 - i.discountPercentage / 100);
      const added = addedItems[i.id];

      return (
        <div
          key={i.id}
          onClick={() => navigate(`/product/${i.id}`)}
          className="group flex flex-col bg-[#FFFFFF] border border-transparent hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer h-full pb-4"
          data-aos="fade-up"
          data-aos-delay={(idx % 4) * 100}
        >
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5] flex items-center justify-center w-full">
             <img
               src={i.image}
               alt={i.name}
               className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 mix-blend-multiply"
               loading="lazy"
               onError={(e) => { e.target.style.display = "none"; }}
             />

             {/* Top badges */}
             <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {i.discountPercentage > 0 && (
                   <span className="bg-[#000000] text-[#FFFFFF] text-[10px] uppercase font-bold tracking-[0.1em] px-[8px] py-[4px] rounded-none">
                     SALE
                   </span>
                )}
             </div>

             {/* Wishlist Button */}
             <button
                onClick={(e) => { e.stopPropagation(); dispatch({ type: 'TOGGLE_WISHLIST', payload: i }); }}
                className="absolute top-3 right-3 text-[20px] z-10 transition-transform duration-300 hover:scale-110 text-[#000000]"
             >
                {isInWishlist(i) ? <GoHeartFill className="scale-110" /> : <GoHeart />}
             </button>

             {/* Sliding Add To Cart Button */}
             <button
               className={`absolute bottom-0 w-full left-0 bg-[#000000] text-[#FFFFFF] py-[16px] text-[12px] uppercase font-bold tracking-[0.15em] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350 ease-out rounded-none border border-[#000000] ${added ? 'bg-[#575757]' : 'hover:!bg-[#575757]'}`}
               onClick={(e) => handleAddToCart(e, i)}
             >
               {added ? "✓ ADDED" : "ADD TO CART"}
             </button>
          </div>

          {/* Product Meta */}
          <div className="pt-4 flex flex-col text-center mt-auto">
             <h3 className="text-[13px] font-bold text-[#000000] uppercase tracking-[0.1em] leading-[1.4] line-clamp-2 px-2">
                {i.name}
             </h3>
             <div className="flex justify-center items-center gap-3 mt-3">
                {i.discountPercentage > 0 && (
                   <span className="text-[13px] text-[#757575] line-through">
                      ₹{oldPrice.toFixed(2)}
                   </span>
                )}
                <span className="text-[14px] font-normal text-[#000000]">
                   ₹{i.price.toFixed(2)}
                </span>
             </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section
      id="products-section"
      className="section-wrapper w-full max-w-[1280px] mx-auto"
    >
      {/* Section Header */}
      <div className="section-heading-container" data-aos="fade-up">
         <span className="section-label">OUR COLLECTION</span>
         <h2 className="section-title">TRENDING NOW</h2>
         <div className="section-underline"></div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-6 lg:gap-10 items-center justify-center mb-16">
        {categories.map((category) => (
          <button
            key={category}
            className={`text-[12px] font-[500] uppercase tracking-[0.12em] pb-2 relative transition-colors ${
               activeTab === category 
                  ? "text-[#000000] border-b-2 border-[#000000]" 
                  : "text-[#757575] border-b-2 border-transparent hover:text-[#000000]"
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Listing */}
      <div className="w-full">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 gap-y-12">
            {renderSkeletons()}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 w-full">
            <h3 className="text-[20px] font-bold text-[#000000] uppercase tracking-[0.1em] mb-4">
              NO PRODUCTS FOUND
            </h3>
            <p className="text-[15px] text-[#757575] mb-8">
              Try a different category or search term.
            </p>
            <button
                onClick={handleClearFilters}
                className="bg-[#FFFFFF] border border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] uppercase font-bold tracking-[0.1em] text-[13px] px-10 py-[16px] rounded-none transition-colors duration-300"
            >
               CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 gap-y-12 items-stretch">
             {renderProducts()}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
