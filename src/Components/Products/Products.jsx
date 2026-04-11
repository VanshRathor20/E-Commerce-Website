import React, { useEffect, useMemo, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { fetchUnifiedProducts } from "../../services/productService";
import Filters from "../Filters/Filters";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

const PAGE_SIZE = 20;

const extractSortId = (id) => {
  const matched = String(id).match(/(\d+)$/);
  return matched ? Number(matched[1]) : 0;
};

const Products = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { wishlist, searchQuery } = state;

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFatalError, setIsFatalError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 99999 });
  const [draftPriceRange, setDraftPriceRange] = useState({
    min: 0,
    max: 99999,
  });
  const [addedItems, setAddedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const loadProducts = async () => {
    setLoading(true);
    setIsFatalError(false);
    try {
      const unified = await fetchUnifiedProducts();
      setAllProducts(unified);
    } catch (error) {
      setIsFatalError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    console.log(
      "Category distribution:",
      allProducts.reduce((acc, product) => {
        const key = product.category || "unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    );
  }, [allProducts]);

  const matchesCategory = (productCategory, filterCategory) => {
    const productCat = String(productCategory || "")
      .toLowerCase()
      .trim();
    const filterCat = String(filterCategory || "")
      .toLowerCase()
      .trim();

    if (filterCat === "all") return true;
    if (productCat === filterCat) return true;
    if (productCat.includes(filterCat)) return true;
    if (filterCat.includes(productCat)) return true;

    return false;
  };

  const filteredProducts = useMemo(() => {
    const query = String(searchQuery || "")
      .toLowerCase()
      .trim();
    const next = allProducts
      .filter((p) => matchesCategory(p.category, activeCategory))
      .filter((p) => p.title.toLowerCase().includes(query))
      .filter((p) => p.price >= priceRange.min && p.price <= priceRange.max)
      .sort((a, b) => {
        if (sortBy === "low-high") return a.price - b.price;
        if (sortBy === "high-low") return b.price - a.price;
        if (sortBy === "newest")
          return extractSortId(b.id) - extractSortId(a.id);
        return 0;
      });
    return next;
  }, [allProducts, activeCategory, searchQuery, sortBy, priceRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy, priceRange]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const showingFrom =
    filteredProducts.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(currentPage * PAGE_SIZE, filteredProducts.length);

  const jumpToPage = (page) => {
    const clamped = Math.min(totalPages, Math.max(1, page));
    setCurrentPage(clamped);
    const section = document.getElementById("products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const inWishlist = (id) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (event, product) => {
    event.stopPropagation();
    if (inWishlist(product.id)) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
      return;
    }
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSortBy("default");
    setPriceRange({ min: 0, max: 99999 });
    setDraftPriceRange({ min: 0, max: 99999 });
    dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
  };

  if (isFatalError) {
    return (
      <section
        id="products-section"
        className="section-wrapper w-full max-w-[1280px] mx-auto"
      >
        <div className="flex flex-col items-center justify-center text-center p-[80px] border border-[#E1E1E1]">
          <div className="w-[48px] h-[48px] border-2 border-[#000000] rounded-full flex items-center justify-center text-[#000000] text-[24px] font-bold mb-5">
            !
          </div>
          <h2 className="text-[#000000] text-[20px] font-bold uppercase tracking-[0.1em] mb-3">
            SOMETHING WENT WRONG
          </h2>
          <p className="text-[#757575] text-[15px] mb-8">
            We couldn't load products. Please try again.
          </p>
          <button
            onClick={loadProducts}
            className="bg-[#000000] text-[#FFFFFF] px-8 py-[14px] text-[13px] uppercase tracking-[0.1em] font-bold hover:bg-[#575757] transition-colors cursor-pointer"
          >
            TRY AGAIN
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products-section"
      className="section-wrapper w-full max-w-[1280px] mx-auto"
    >
      <div className="section-heading-container" data-aos="fade-up">
        <span className="section-label">OUR COLLECTION</span>
        <h2 className="section-title">TRENDING NOW</h2>
        <div className="section-underline" />
      </div>

      <Filters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        draftPriceRange={draftPriceRange}
        setDraftPriceRange={setDraftPriceRange}
        applyPriceRange={() => {
          const min = Math.max(0, Number(draftPriceRange.min) || 0);
          const max = Math.max(min, Number(draftPriceRange.max) || 0);
          setPriceRange({ min, max });
          setDraftPriceRange({ min, max });
        }}
      />

      {!loading && (
        <p className="text-[13px] text-[#757575] uppercase tracking-[0.1em] mb-6">
          Showing {showingFrom}-{showingTo} of {filteredProducts.length}{" "}
          products
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-[#E1E1E1]">
          <h3 className="text-[20px] text-[#000000] uppercase tracking-[0.1em] font-bold mb-3">
            NO PRODUCTS FOUND
          </h3>
          <p className="text-[#757575] mb-8">
            Try a different search term or category.
          </p>
          <button
            onClick={clearFilters}
            className="border border-[#000000] bg-[#FFFFFF] text-[#000000] px-7 py-[13px] text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[#000000] hover:text-[#FFFFFF] transition-all cursor-pointer"
          >
            CLEAR FILTERS
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageProducts.map((product) => {
              const wishlistActive = inWishlist(product.id);
              const hasDiscount = Number(product.discountPercentage) > 0;
              const originalPrice = hasDiscount
                ? product.price / (1 - product.discountPercentage / 100)
                : null;
              const stars = Math.min(
                5,
                Math.max(0, Math.round(Number(product.rating) || 0)),
              );

              return (
                <article
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer border border-[#E1E1E1] bg-[#FFFFFF] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all"
                >
                  <div className="relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="bg-[#000000] text-[#FFFFFF] px-2 py-1 text-[10px] uppercase tracking-[0.1em] font-bold">
                        {product.category}
                      </span>
                      {hasDiscount && (
                        <span className="bg-[#000000] text-[#FFFFFF] px-2 py-1 text-[10px] uppercase tracking-[0.1em] font-bold">
                          SALE
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(event) => toggleWishlist(event, product)}
                      className="absolute top-3 right-3 text-[20px] text-[#000000] cursor-pointer"
                      aria-label="Toggle wishlist"
                    >
                      {wishlistActive ? <GoHeartFill /> : <GoHeart />}
                    </button>

                    <button
                      onClick={(event) => handleAddToCart(event, product)}
                      className={`absolute bottom-0 left-0 w-full py-[14px] text-[12px] font-bold uppercase tracking-[0.12em] text-[#FFFFFF] bg-[#000000] transform transition-all duration-300 cursor-pointer ${
                        addedItems[product.id]
                          ? "translate-y-0 bg-[#575757]"
                          : "translate-y-full group-hover:translate-y-0"
                      }`}
                    >
                      {addedItems[product.id] ? "ADDED" : "ADD TO CART"}
                    </button>
                  </div>

                  <div className="px-4 py-4">
                    <h3 className="text-[13px] text-[#000000] font-bold uppercase tracking-[0.1em] leading-[1.5] min-h-[40px] line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-3">
                      {hasDiscount && (
                        <span className="text-[12px] text-[#757575] line-through">
                          ₹{originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-[15px] text-[#000000] font-bold">
                        ₹{Number(product.price).toFixed(2)}
                      </span>
                    </div>

                    {stars > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-[14px]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <AiFillStar
                            key={`${product.id}-star-${index}`}
                            className={
                              index < stars
                                ? "text-[#000000]"
                                : "text-[#E1E1E1]"
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => jumpToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-[#E1E1E1] text-[#000000] disabled:opacity-50 cursor-pointer"
            >
              ←
            </button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              const active = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => jumpToPage(page)}
                  className={`min-w-[36px] px-3 py-2 border text-[13px] uppercase tracking-[0.08em] cursor-pointer ${
                    active
                      ? "bg-[#000000] text-[#FFFFFF] border-[#000000]"
                      : "bg-[#FFFFFF] text-[#000000] border-[#E1E1E1] hover:bg-[#F5F5F5]"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => jumpToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-[#E1E1E1] text-[#000000] disabled:opacity-50 cursor-pointer"
            >
              →
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Products;
