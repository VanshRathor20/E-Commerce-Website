import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const OrderPlace = ({ subtotal = 100, onClose }) => {
  const [showQR, setShowQR] = useState(false);

  const upiId = "your-upi-id@paytm"; // your real UPI ID here
  const upiName = "My Store";
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    upiName
  )}&am=${subtotal}&cu=INR`;

  const handlePayment = () => {
    setShowQR(true);
  };

  return (
    <section className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg p-8 w-full max-w-md text-center shadow-lg relative">
        <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
        <p className="mb-6 text-lg">Total Amount: ₹{subtotal.toFixed(2)}</p>

        {!showQR ? (
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={handlePayment}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-44"
            >
              Pay via UPI
            </button>

            <button
              onClick={() => onClose && onClose()}
              className="bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-3 rounded-lg w-44"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Scan to Pay</h2>
            <QRCodeCanvas value={upiUrl} size={200} />
            <p className="text-sm text-gray-600">
              Scan this QR with any UPI app (Paytm, GPay, PhonePe)
            </p>
            <a
              href={upiUrl}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Pay Now via UPI App
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderPlace;
