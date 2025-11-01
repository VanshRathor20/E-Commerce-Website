import React from "react";

const OrderSummary = ({ cart, subtotal, shippingFee, orderTotal, closePanel, onPlaceOrder }) => {
  return (
  <section className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-white/90 w-full max-w-3xl rounded-lg p-8 border border-zinc-300">
        <h2 className="text-3xl text-zinc-800 font-bold mb-6 text-center">Order Summary</h2>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-zinc-500">No items in cart</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-zinc-200 py-3">
                <span className="text-zinc-800">{item.name} (x{item.quantity})</span>
                <span className="text-zinc-800">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-zinc-800">Subtotal</span>
            <span className="text-zinc-800">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-800">Shipping & Handling</span>
            <span className="text-zinc-800">₹{shippingFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between pt-3 border-t border-zinc-300">
            <span className="text-blue-600 font-bold text-xl">Order Total</span>
            <span className="text-blue-600 font-bold text-xl">₹{orderTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex mt-6 gap-x-4">
          <button onClick={closePanel} className="bg-zinc-800 flex-1 cursor-pointer py-3 text-white rounded-lg active:bg-zinc-900">
            Close
          </button>
          <button
            onClick={() => {
              // Hide summary modal and trigger order placement UI
              onPlaceOrder && onPlaceOrder();
              closePanel && closePanel();
            }}
            className="bg-blue-600 flex-1 py-3 text-white cursor-pointer rounded-lg active:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
