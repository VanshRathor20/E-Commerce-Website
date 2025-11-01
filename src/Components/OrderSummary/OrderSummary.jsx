import React from "react";

const OrderSummary = ({ cart ,subTotal}) => {
  return (
    <section className="bg-gray-500/90 fixed inset-0 z-50 flex justify-center items-center ">
      <div className="bg-zic-100 p-10 w-150 rounded-lg border-1 border-zinc-300">
        <h2 className="text-3xl text-zinc-800 font-bold mb-5 text-center">
          Order Summary
        </h2>
      </div>

      <div>
        <div>
          {cart.map((i) => (
            <div key={i.id} className="flex justify-between items-center">
              <span className="text-zinc-800 py-2">
                {i.name}(x{i.quantity})
              </span>
              <span className="text-zinc-800 py-2">
                ${i.price * i.quantity}.toFixed(2)
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
            <span className="text-zinc-800">
                subTotal
            </span>
            {/* <span className="text-zinc-800">${subTotal.toFixed(2)}</span> */}

        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
