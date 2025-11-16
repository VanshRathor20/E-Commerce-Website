import React, { useState } from "react";
// import ProductList from "./Products.js";
import ProductList from "../Products/ProductList";
import { GoHeartFill } from "react-icons/go";

const Products = ({ searchQuery, AddToCart, addToWishlist, wishlist = [] }) => {
  const categories = [
    "All",
    "Mens",
    "Womens",
    "Kids",
    "New Arrivals",
    "On Sale",
  ];

  // activeTab stores the category string (match items in `categories`)
  const [activeTab, setActiveTab] = useState("All");

  const filterItems = ProductList.filter((i) => {
    const matchesCategory =
      activeTab === "All" ||
      (activeTab === "New Arrivals" && i.NewArrival) ||
      (activeTab === "On Sale" && i.onSale) ||
      activeTab === i.category ||
      (Array.isArray(i.category) && i.category.includes(activeTab)) ||
      (typeof i.category === "string" && i.category === activeTab);

    const matchesSearch = i.name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isInWishlist = (product) => wishlist.some((p) => p.id === product.id);

  const renderProducts = () => {
    return filterItems.map((i) => (
      <div
        key={i.id}
        className="w-[250px] h-[350px] bg-white shadow-lg rounded-lg p-5 flex flex-col justify-between"
      >
        <div className="relative">
          <button
            onClick={() => addToWishlist(i)}
            className={`cursor-pointer absolute top-0 right-0 text-3xl transition-colors ${
              isInWishlist(i)
                ? "text-red-500"
                : "text-zinc-300 hover:text-red-500"
            }`}
          >
            <GoHeartFill />
          </button>

          {i.onSale && (
            <span className="absolute top-0 left-0 px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded">
              Sale
            </span>
          )}

          {i.NewArrival && (
            <span className="absolute top-0 left-0 px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded">
              New
            </span>
          )}

          <div className="mt-8 flex justify-center">
            <img
              src={i.image}
              alt={i.name}
              className="w-[150px] h-[150px] object-contain"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">{i.name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{i.price.toFixed(2)}
            </span>
            {i.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{i.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            className="w-full mt-3 bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            onClick={() => AddToCart(i)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section
      id="products-section"
      className=" w-full mx-auto my-20 p-5 sm:mt-80"
    >
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 items-center justify-center mb-10">
        {categories.map((category) => (
          <button
            key={category}
            className={`cursor-pointer text-lg font-weight-700 rounded-full px-8 py-2 transition-colors
                      ${
                        activeTab === category
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
                      }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Listing */}
      <div className="flex flex-wrap gap-6 justify-center mt-10">
        {filterItems.length === 0 ? (
          <p className="text-lg font-semibold text-zinc-800">
            No products found
          </p>
        ) : (
          renderProducts()
        )}
      </div>
    </section>
  );
};

export default Products;
