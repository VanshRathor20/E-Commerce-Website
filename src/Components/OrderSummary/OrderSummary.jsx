import React from "react";
import { HiX } from "react-icons/hi";

const OrderSummary = ({ cart, subtotal, shippingFee, orderTotal, closePanel, onPlaceOrder }) => {
  return (
    <section className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60">
      <div className="bg-[#FFFFFF] w-[90vw] sm:w-full max-w-[560px] p-[24px] sm:p-[40px] border border-[#E1E1E1] shadow-2xl relative z-[9999] fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
        <button
          onClick={closePanel}
          className="absolute top-4 right-4 text-fashion-black hover:text-fashion-grey transition-colors text-[20px] cursor-pointer bg-transparent border-none"
        >
          <HiX />
        </button>

        <h2 className="text-[16px] text-fashion-black font-bold mb-8 text-center uppercase tracking-widest border-b border-fashion-border pb-4">
          Order Summary
        </h2>

        <div className="space-y-4 max-h-[40vh] overflow-y-auto scroll pr-2">
          {cart.length === 0 ? (
            <p className="text-center text-fashion-grey text-[13px] uppercase tracking-widest">
              No items in cart
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-[#E1E1E1] pb-3">
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] flex-shrink-0 bg-[#F5F5F5] border border-[#E1E1E1] relative overflow-hidden flex items-center justify-center">
                    {item.thumbnail || item.image ? (
                      <img
                        src={item.thumbnail || item.image}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : null}
                  </div>
                  <span className="text-fashion-black text-[13px] font-semibold uppercase tracking-widest leading-tight">
                    {item.title || item.name} <span className="text-fashion-grey text-[12px] ml-1">x{item.quantity}</span>
                  </span>
                </div>
                <span className="text-fashion-black text-[14px] font-bold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex justify-between text-[13px]">
            <span className="text-fashion-black uppercase tracking-widest font-bold">Subtotal</span>
            <span className="text-fashion-black font-bold">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-[13px]">
            <span className="text-fashion-grey uppercase tracking-widest">Shipping & Handling</span>
            <span className="text-fashion-black font-bold">₹{shippingFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between pt-4 mt-2 border-t border-fashion-border">
            <span className="text-fashion-black font-bold text-[14px] uppercase tracking-widest">Order Total</span>
            <span className="text-fashion-black font-bold text-[16px]">₹{orderTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex mt-8 gap-x-4">
          <button
            onClick={closePanel}
            className="border border-fashion-black bg-transparent flex-1 cursor-pointer py-4 text-fashion-black font-bold uppercase tracking-widest text-[12px] hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Hide summary modal and trigger order placement UI
              onPlaceOrder && onPlaceOrder();
              closePanel && closePanel();
            }}
            className="bg-fashion-black flex-1 py-4 text-fashion-white font-bold uppercase tracking-widest text-[12px] cursor-pointer hover:bg-[#575757] transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
