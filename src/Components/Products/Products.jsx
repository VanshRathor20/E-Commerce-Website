import React, { useState, useEffect, useMemo } from "react";
import { GoHeartFill, GoHeart } from "react-icons/go";

const Products = ({
  searchQuery = "",
  AddToCart,
  addToWishlist,
  wishlist = [],
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [activeTab, setActiveTab] = useState("All");

  const normalizeProduct = (item) => ({
    ...item,
    name: item.title,
    image: item.thumbnail,
  });

  const fetchProducts = async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://dummyjson.com/products", {
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
          typeof searchQuery === "string"
            ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
      }),
    [products, activeTab, searchQuery],
  );

  const isInWishlist = (product) => wishlist.some((p) => p.id === product.id);

  if (loading) {
    return (
      <section id="products-section" className="w-full py-20 px-5">
        <div className="flex justify-center items-center py-14">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-fashion-grey border-t-fashion-black"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products-section" className="w-full py-20 px-5">
         <div className="text-center">
            <p className="text-lg text-red-600 mb-4 uppercase tracking-widest">{error}</p>
            <button
               onClick={() => fetchProducts()}
               className="bg-fashion-black text-fashion-white uppercase font-bold tracking-widest text-[12px] px-8 py-3"
            >
               TRY AGAIN
            </button>
         </div>
      </section>
    );
  }

  const renderProducts = () => {
    return filteredProducts.map((i, idx) => {
      const oldPrice = i.price / (1 - i.discountPercentage / 100);

      return (
        <div
          key={i.id}
          className="group flex flex-col bg-white border border-transparent hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay={(idx % 4) * 100}
        >
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center">
             <img
               src={i.image}
               alt={i.name}
               className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 mix-blend-multiply"
               loading="lazy"
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
                onClick={() => addToWishlist && addToWishlist(i)}
                className="absolute top-3 right-3 text-xl z-10 transition-colors text-[#000000]"
             >
                {isInWishlist(i) ? <GoHeartFill /> : <GoHeart />}
             </button>

             {/* Sliding Add To Cart Button */}
             <button
               className="absolute bottom-0 w-full left-0 bg-[#000000] text-[#FFFFFF] py-[14px] text-[12px] uppercase font-bold tracking-[0.15em] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350 ease-out hover:!bg-[#575757] rounded-none"
               onClick={() => AddToCart && AddToCart(i)}
             >
               Add to Cart
             </button>
          </div>

          {/* Product Meta */}
          <div className="pt-4 pb-2 px-2 flex flex-col text-center">
             <h3 className="text-[13px] font-bold text-fashion-black uppercase tracking-widest leading-tight truncate">
                {i.name}
             </h3>
             <div className="flex justify-center items-center gap-3 mt-2">
                {i.discountPercentage > 0 && (
                   <span className="text-[13px] text-fashion-grey line-through">
                      ₹{oldPrice.toFixed(2)}
                   </span>
                )}
                <span className="text-[14px] font-normal text-fashion-black">
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
      className="w-full max-w-[1280px] mx-auto py-20 px-5 lg:px-10"
    >
      {/* Section Header */}
      <div className="mb-14 text-center">
         <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-fashion-grey mb-4">OUR COLLECTION</h2>
         <div className="w-full h-[1px] bg-fashion-border max-w-sm mx-auto mb-6"></div>
         <p className="text-3xl lg:text-4xl font-bold uppercase tracking-widest text-fashion-black">TRENDING NOW</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 lg:gap-8 items-center justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className={`text-[12px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all ${
               activeTab === category 
                  ? "border-fashion-black text-fashion-black" 
                  : "border-transparent text-fashion-grey hover:text-fashion-black hover:border-fashion-grey"
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Listing */}
      <div className="w-full">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 w-full">
            <p className="text-[16px] font-bold text-fashion-black uppercase tracking-widest mb-2">
              No products found
            </p>
            <p className="text-[14px] text-fashion-grey">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 gap-y-12">
             {renderProducts()}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
