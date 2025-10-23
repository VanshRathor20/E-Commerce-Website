import React from "react";
import sweater from "../../assets/sweater.png";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
const Cart = ({activePanel,closePanel}) => {
  return (
    <div className={`flex flex-col justify-between gap-5 bg-zinc-100 fixed top-0 right-0 bottom-0 left-auto z-50 w-[400px] border-1 border-zinc-300 py-7 transform transition-transform duration-300 ${activePanel ==='cart'?'translate-x-0':'translate-x-full'}`}>
      {/* Heading */}
      <div>
        <h3 className="font-bold text-3xl text-zinc-800 text-center ">
          Your Cart
        </h3>
      </div>

      {/* Cart Items */}
      <div className="flex-1">
        <div className="flex items-center gap-3  bg-white px-5 py-1 border-y-1 border-zinnc-300">
          {/* Cart Image */}
          <div className="w-20 h-20  ">
            <img
              src={sweater}
              alt="sweater image"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <div className="flex justify-between">
              <h4 className="font-semibold text-zinc-800 text-lg">Sweater</h4>
              <button className="w-8 h-8 bg-red-600 rounded-full text-white flex justify-center items-center mr-6">
                <FaTrash />
              </button>
            </div>

            <div className="flex justify-between">
              <span>₹0.00</span>
              <div className="flex gap-2">
                <button className="w-7 h-7 bg-blue-600 rounded-full text-white flex justify-center items-center cursor-pointer active:bg-blue-700 text-[14px]"><FaMinus/></button>
                <span>1</span>
                <button className="w-7 h-7 bg-blue-600 rounded-full text-white flex justify-center items-center cursor-pointer active:bg-blue-700 text-[14px]"><FaPlus/></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Total */}
      <div className="px-10 border-y border-zinc-300">
        <div className="flex justify-between pt-2">
          <span className="text-zinc-800 text-lg ">Subtotal</span>

          <span className="text-zinc-800 text-lg">₹0.00</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-zinc-800 text-lg">Shipping & Handling</span>

          <span className="text-zinc-800 text-lg">₹0.00</span>
        </div>

        <div className="flex justify-between py-2 border-t border-zinc-300">
          <span className="font-bold text-xl text-blue-900">Order Total</span>

          <span className="text-blue-900 text-xl">₹0.00</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-x-2 px-10">

        {/* close button  */}
        <button className="bg-blue-600 text-white flex-1 h-[7vh] rounded-full cursor-pointer active:bg-blue-700" onClick={closePanel}>
          Close
        </button>

        {/* checkout button */}
        <button className="bg-blue-600 text-white flex-1 h-[7vh] rounded-full cursor-pointer active:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
