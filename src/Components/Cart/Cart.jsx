import React from "react";
import { HiX, HiMinus, HiPlus, HiOutlineShoppingBag } from "react-icons/hi";

const Cart = ({ activePanel, closePanel, cart, setCart, setOrderSummary }) => {
  return (
    <>
      {/* Backdrop overlay */}
      {activePanel === "cart" && (
        <div
          className="fixed inset-0 bg-black/60 z-[9998] transition-opacity"
          onClick={closePanel}
        ></div>
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[9999] h-[100vh] w-full sm:w-[420px] bg-[#FFFFFF] border-l border-[#E1E1E1] flex flex-col transition-transform duration-350 ease-in-out overflow-y-auto ${
          activePanel === "cart" 
            ? "translate-y-0 sm:translate-x-0" 
            : "translate-y-full sm:translate-y-0 sm:translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-fashion-border">
          <h3 className="font-bold text-[14px] text-fashion-black uppercase tracking-widest">
            Your Cart
          </h3>
          <button
            onClick={closePanel}
            className="text-fashion-black hover:text-fashion-grey transition-colors text-[20px] cursor-pointer bg-transparent border-none"
          >
            <HiX />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto scroll">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 px-6">
              <HiOutlineShoppingBag className="text-4xl text-fashion-grey" />
              <p className="text-fashion-grey text-[13px] uppercase tracking-widest font-semibold">
                Your cart is empty
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-fashion-white px-6 py-4 border-b border-fashion-border hover:bg-[#F9F9F9] transition-colors"
              >
                {/* Cart Image */}
                <div className="w-[72px] h-[72px] border border-fashion-border flex-shrink-0 bg-[#F5F5F5] flex items-center justify-center relative overflow-hidden">
                  {item.thumbnail || item.image ? (
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 bg-[#F5F5F5] items-center justify-center"
                    style={{ display: (item.thumbnail || item.image) ? "none" : "flex" }}
                  >
                    <HiOutlineShoppingBag className="text-gray-400 text-2xl" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-fashion-black text-[13px] uppercase tracking-widest leading-tight">
                      {item.title || item.name}
                    </h4>
                    <button
                      className="text-fashion-black hover:text-fashion-grey transition-colors cursor-pointer text-[16px] ml-4"
                      onClick={() => {
                        setCart((prevCart) =>
                          prevCart.filter((cartItem) => cartItem.id !== item.id)
                        );
                      }}
                       aria-label="Remove item"
                    >
                      <HiX />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center">
                      <button
                        className="w-7 h-7 border border-fashion-border text-fashion-black flex justify-center items-center cursor-pointer hover:bg-fashion-border flex-shrink-0 transition-colors"
                        onClick={() => {
                          if (item.quantity > 1) {
                            setCart((prevCart) =>
                              prevCart.map((cartItem) =>
                                cartItem.id === item.id
                                  ? {
                                      ...cartItem,
                                      quantity: cartItem.quantity - 1,
                                    }
                                  : cartItem
                              )
                            );
                          }
                        }}
                      >
                        <HiMinus />
                      </button>
                      <span className="w-10 text-center text-[13px] text-fashion-black font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="w-7 h-7 border border-fashion-border text-fashion-black flex justify-center items-center cursor-pointer hover:bg-fashion-border flex-shrink-0 transition-colors"
                        onClick={() => {
                          setCart((prevCart) =>
                            prevCart.map((cartItem) =>
                              cartItem.id === item.id
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                            )
                          );
                        }}
                      >
                        <HiPlus />
                      </button>
                    </div>
                    <span className="text-[14px] font-bold text-fashion-black">
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Area */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-fashion-border bg-fashion-white flex flex-col gap-4">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-fashion-black font-bold uppercase tracking-widest">
                Subtotal
              </span>
              <span className="text-fashion-black font-bold">
                ₹
                {cart
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center text-[13px] pb-3 border-b border-fashion-border">
              <span className="text-fashion-grey uppercase tracking-widest">
                Shipping & Handling
              </span>
              <span className="text-fashion-black font-bold">₹50.00</span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-fashion-black font-bold text-[14px] uppercase tracking-widest">
                Order Total
              </span>
              <span className="text-fashion-black font-bold text-[16px]">
                ₹
                {(
                  cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  ) + 50
                ).toFixed(2)}
              </span>
            </div>

            <button
              className="w-full bg-fashion-black text-fashion-white font-bold uppercase tracking-widest text-[12px] py-4 rounded-none cursor-pointer hover:bg-[#575757] transition-colors"
              onClick={() => {
                closePanel();
                setOrderSummary(true);
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
