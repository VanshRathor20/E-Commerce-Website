import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
const Cart = ({ activePanel, closePanel, cart, setCart }) => {
  return (
    <div
      className={`scroll flex flex-col justify-between gap-5 bg-zinc-100 fixed top-0 right-0 bottom-0 left-auto z-50 w-[400px] border border-zinc-300 py-7 transform transition-transform duration-300 ${
        activePanel === "cart" ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Heading */}
      <div>
        <h3 className="font-bold text-3xl text-zinc-800 text-center ">
          Your Cart
        </h3>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-white px-5 py-3 border-y border-zinc-300 mb-2"
            >
              {/* Cart Image */}
              <div className="w-20 h-20">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-zinc-800 text-lg">
                    {item.name}
                  </h4>
                  <button
                    className="w-8 h-8 bg-red-600 rounded-full text-white flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      setCart((prevCart) =>
                        prevCart.filter((cartItem) => cartItem.id !== item.id)
                      );
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-semibold">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-7 h-7 bg-blue-600 rounded-full text-white flex justify-center items-center cursor-pointer active:bg-blue-700 text-[14px]"
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
                      <FaMinus />
                    </button>
                    <span className="px-3 py-1 bg-gray-100 rounded">
                      {item.quantity}
                    </span>
                    <button
                      className="w-7 h-7 bg-blue-600 rounded-full text-white flex justify-center items-center cursor-pointer active:bg-blue-700 text-[14px]"
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
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Total */}
      <div className="px-10 border-y border-zinc-300">
        <div className="flex justify-between pt-2">
          <span className="text-zinc-800 text-lg">Subtotal</span>
          <span className="text-zinc-800 text-lg">
            ₹
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-zinc-800 text-lg">Shipping & Handling</span>
          <span className="text-zinc-800 text-lg">₹50.00</span>
        </div>

        <div className="flex justify-between py-2 border-t border-zinc-300">
          <span className="font-bold text-xl text-blue-900">Order Total</span>
          <span className="text-blue-900 text-xl">
            ₹
            {(
              cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ) + 50
            ).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-x-2 px-10">
        {/* close button  */}
        <button
          className="bg-blue-600 text-white flex-1 h-[7vh] rounded-full cursor-pointer active:bg-blue-700"
          onClick={closePanel}
        >
          Close
        </button>

        {/* checkout button */}
        <button
          className={` text-white flex-1 h-[7vh] rounded-full cursor-pointer  ${
            cart.length === 0
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-600 cursor-pointer active:bg-blue-700 "
          }`}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
