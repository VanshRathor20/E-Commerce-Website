import React, { useState, useEffect, useMemo } from "react";
import { GoHeartFill, GoStarFill } from "react-icons/go";

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
      <section
        id="products-section"
        className="w-full max-w-7xl mx-auto my-12 px-5"
      >
        <div className="flex justify-center items-center py-14">
          <div
            className="animate-spin rounded-full h-14 w-14 border-4 border-zinc-200 border-t-zinc-900"
            aria-label="Loading products"
          ></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-[360px] rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <div className="h-40 rounded-xl bg-zinc-100 animate-pulse"></div>
              <div className="mt-5 h-4 rounded bg-zinc-100 animate-pulse"></div>
              <div className="mt-3 h-4 w-2/3 rounded bg-zinc-100 animate-pulse"></div>
              <div className="mt-8 h-10 rounded-xl bg-zinc-100 animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="products-section"
        className="w-full max-w-7xl mx-auto my-12 px-5"
      >
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center max-w-2xl mx-auto">
          <p className="text-xl font-semibold text-red-700 mb-2">
            Unable to load products
          </p>
          <p className="text-red-600/90">{error}</p>
          <button
            onClick={() => fetchProducts()}
            className="mt-6 bg-zinc-900 text-white px-5 py-2.5 rounded-lg font-medium cursor-pointer hover:bg-black transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const renderProducts = () => {
    return filteredProducts.map((i) => {
      // Calculate old price based on discount
      const oldPrice = i.price / (1 - i.discountPercentage / 100);

      return (
        <div
          key={i.id}
          className="bg-white shadow-sm border border-zinc-100 hover:shadow-xl rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="relative">
            <button
              onClick={() => addToWishlist && addToWishlist(i)}
              className={`cursor-pointer absolute top-0 right-0 text-2xl z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors ${
                isInWishlist(i)
                  ? "text-red-500"
                  : "text-zinc-400 hover:text-red-500"
              }`}
            >
              <GoHeartFill />
            </button>

            {i.discountPercentage > 0 && (
              <span className="absolute top-0 left-0 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg z-10 shadow-sm">
                {Math.round(i.discountPercentage)}% OFF
              </span>
            )}

            <div className="mt-2 flex justify-center bg-gray-50/50 rounded-xl overflow-hidden p-2">
              <img
                src={i.image}
                alt={i.name}
                className="w-full h-[160px] object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col flex-grow">
            <div className="flex justify-between items-start gap-2">
              <h3
                className="text-md font-semibold text-gray-800 line-clamp-2 leading-tight flex-grow"
                title={i.name}
              >
                {i.name}
              </h3>
              <div className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-md min-w-max">
                <GoStarFill className="text-amber-400 text-xs" />
                <span className="text-xs font-bold text-gray-700">
                  {i.rating ? i.rating.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-end gap-2 mt-3 mb-4">
                <span className="text-2xl font-bold text-gray-900 leading-none">
                  ${i.price.toFixed(2)}
                </span>
                {i.discountPercentage > 0 && (
                  <span className="text-sm text-gray-500 line-through mb-0.5">
                    ${oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <button
                className="w-full bg-gray-900 text-white cursor-pointer px-4 py-2.5 rounded-xl font-semibold hover:bg-black hover:shadow-lg active:scale-95 transition-all"
                onClick={() => AddToCart && AddToCart(i)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section
      id="products-section"
      className="w-full max-w-7xl mx-auto my-12 p-5"
    >
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 items-center justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className={`cursor-pointer text-sm font-medium rounded-full px-6 py-2 transition-all capitalize
                      ${
                        activeTab === category
                          ? "bg-gray-900 text-white shadow-md"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900"
                      }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 w-full">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              No products found
            </p>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          renderProducts()
        )}
      </div>
    </section>
  );
};

export default Products;
