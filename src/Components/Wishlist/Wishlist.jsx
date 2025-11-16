import React from "react";
import { FaTrash } from "react-icons/fa";

const Wishlist = ({
  activePanel,
  closePanel,
  wishlist = [],
  removeFromWishlist,
  clearWishlist,
  AddToCart,
}) => {
  return (
    <div
      className={`flex flex-col justify-between gap-5 bg-zinc-100 fixed top-0 right-0 bottom-0 left-auto z-50 w-[400px] border border-zinc-300 py-7 transform transition-transform duration-300  ${
        activePanel === "wishlist" ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div>
        <h3 className="font-bold text-3xl text-zinc-800 text-center ">
          Your Wishlist
        </h3>
      </div>

      <div className="flex-1">
        {wishlist.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-500 text-lg">Your wishlist is empty</p>
          </div>
        ) : (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-white px-5 py-3 border-y border-zinc-300 mt-2"
            >
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-zinc-800 text-lg">
                    {item.name}
                  </h4>
                  <button
                    onClick={() =>
                      removeFromWishlist && removeFromWishlist(item.id)
                    }
                    className="w-8 h-8 bg-red-600 rounded-full text-white flex justify-center items-center mr-6 cursor-pointer"
                    aria-label="Remove from wishlist"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{item.price.toFixed(2)}
                    </span>
                    {item.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      AddToCart && AddToCart(item);
                      removeFromWishlist && removeFromWishlist(item.id);
                    }}
                    className="bg-blue-600 active:bg-blue-700 text-sm text-white px-5 py-2 rounded-full cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-x-2 px-10">
        <button
          className="bg-blue-600 text-white flex-1 h-[7vh] rounded-full cursor-pointer active:bg-blue-700"
          onClick={closePanel}
        >
          Close
        </button>
        <button
          className={`cursor-pointer text-white flex-1 h-[7vh] rounded-full ${
            wishlist.length === 0
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-600 cursor-pointer active:bg-blue-700"
          }`}
          disabled={wishlist.length === 0}
          onClick={clearWishlist}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
