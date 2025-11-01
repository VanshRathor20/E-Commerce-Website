import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react"; 

const OrderPlace = ({ subtotal = 1000, onClose }) => {
  const [upiUrl, setUpiUrl] = useState("");
  const [paymentSaved, setPaymentSaved] = useState(null);

  const upiId = "yourupiid@upi"; // replace with your actual UPI ID
  const name = "My Store";

  // 🧾 Generate UPI link dynamically
  const handleGenerateQR = () => {
    const amount = subtotal.toFixed(2);
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR&tn=${encodeURIComponent("Payment for Order")}`;

    setUpiUrl(upiLink);

    // 🧠 Save payment info in localStorage
    const paymentInfo = {
      id: Date.now(),
      amount,
      time: new Date().toLocaleString(),
      upiId,
    };
    localStorage.setItem("lastPayment", JSON.stringify(paymentInfo));
    setPaymentSaved(paymentInfo);
  };

  // 📦 Load previous payment info if exists
  useEffect(() => {
    const saved = localStorage.getItem("lastPayment");
    if (saved) {
      setPaymentSaved(JSON.parse(saved));
    }
  }, []);

  return (
    <section className={`fixed inset-0 z-[70] flex items-center justify-center bg-black/30 ${upiUrl ? 'backdrop-blur-md' : 'backdrop-blur-sm'}`}>
      <div className="bg-white rounded-lg p-8 w-full max-w-md text-center shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
        <p className="mb-6">Total Amount: ₹{subtotal.toFixed(2)}</p>

        {!upiUrl ? (
          <button
            onClick={handleGenerateQR}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-44 cursor-pointer"
          >
            Generate Payment QR
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <QRCodeCanvas value={upiUrl} size={200} />
            <button className="bg-green-600 active:bg-green-700 text-white px-6 py-3 rounded-lg">
                <a
              href={upiUrl}
              className="  mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pay using UPI App
            </a>
            </button>
          </div>
        )}

        {paymentSaved && (
          <div className="mt-6 text-sm text-gray-600">
            <p className="font-semibold text-zinc-700">Last Payment:</p>
            <p>₹{paymentSaved.amount} to {paymentSaved.upiId}</p>
            <p className="text-xs">on {paymentSaved.time}</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-3 rounded-lg w-44 mt-6 cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default OrderPlace;
