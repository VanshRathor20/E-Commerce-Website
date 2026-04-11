import React from "react";
import { HiX, HiOutlineHeart } from "react-icons/hi";

const Wishlist = ({
  activePanel,
  closePanel,
  wishlist = [],
  removeFromWishlist,
  clearWishlist,
  AddToCart,
}) => {
  return (
    <>
      {/* Backdrop overlay */}
      {activePanel === "wishlist" && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={closePanel}
        ></div>
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-fashion-white border-l border-fashion-border flex flex-col transition-transform duration-350 ease-in-out ${
          activePanel === "wishlist" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-fashion-border">
          <h3 className="font-bold text-[14px] text-fashion-black uppercase tracking-widest">
            Your Wishlist
          </h3>
          <button
            onClick={closePanel}
            className="text-fashion-black hover:text-fashion-grey transition-colors text-[20px] cursor-pointer bg-transparent border-none"
          >
            <HiX />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto scroll">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 px-6">
              <HiOutlineHeart className="text-4xl text-fashion-grey" />
              <p className="text-fashion-grey text-[13px] uppercase tracking-widest font-semibold">
                Your wishlist is empty
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-fashion-white px-6 py-4 border-b border-fashion-border hover:bg-[#F9F9F9] transition-colors"
              >
                {/* Wishlist Image */}
                <div className="w-[72px] h-[72px] border border-fashion-border flex-shrink-0 bg-[#F5F5F5] flex items-center justify-center relative overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ display: item.image ? "none" : "flex" }}
                  >
                    <HiOutlineHeart className="text-gray-300 text-2xl" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-fashion-black text-[13px] uppercase tracking-widest leading-tight">
                      {item.name}
                    </h4>
                    <button
                      className="text-fashion-black hover:text-fashion-grey transition-colors cursor-pointer text-[16px] ml-4"
                      onClick={() => removeFromWishlist && removeFromWishlist(item.id)}
                      aria-label="Remove from wishlist"
                    >
                      <HiX />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-fashion-black">
                        ₹{item.price.toFixed(2)}
                      </span>
                      {item.oldPrice && (
                        <span className="text-[12px] text-fashion-grey line-through">
                          ₹{item.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        AddToCart && AddToCart(item);
                        removeFromWishlist && removeFromWishlist(item.id);
                      }}
                      className="bg-fashion-black text-fashion-white font-bold uppercase tracking-widest text-[12px] px-4 py-2 rounded-none cursor-pointer hover:bg-[#575757] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Area */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-fashion-border bg-fashion-white flex flex-col">
            <button
              className="w-full bg-fashion-black text-fashion-white font-bold uppercase tracking-widest text-[12px] py-4 rounded-none cursor-pointer hover:bg-[#575757] transition-colors"
              onClick={clearWishlist}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
