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
    <section className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 text-[#000000]">
      <div className="bg-[#FFFFFF] rounded-none p-8 w-[90vw] md:w-full max-w-md text-center border border-[#E1E1E1]">
        <h1 className="text-[20px] font-bold mb-4 uppercase tracking-[0.15em] text-[#000000]">PLACE YOUR ORDER</h1>
        <p className="mb-6 text-[14px]">TOTAL AMOUNT: ₹{subtotal.toFixed(2)}</p>

        {!upiUrl ? (
          <button
            onClick={handleGenerateQR}
            className="bg-[#000000] hover:bg-[#575757] text-[#FFFFFF] px-6 py-[16px] rounded-none w-full cursor-pointer uppercase tracking-[0.1em] text-[13px] font-bold transition-colors"
          >
            Generate Payment QR
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <QRCodeCanvas value={upiUrl} size={200} />
            <button className="bg-[#000000] hover:bg-[#575757] text-[#FFFFFF] rounded-none w-full focus:outline-none">
                <a
              href={upiUrl}
              className="block uppercase tracking-[0.1em] text-[13px] font-bold py-[16px] w-full"
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
            <p className="font-semibold text-[#757575] uppercase text-[13px] tracking-widest">Last Payment:</p>
            <p className="text-[#000000] text-[15px] font-bold">₹{paymentSaved.amount} to {paymentSaved.upiId}</p>
            <p className="text-[12px] text-[#757575] uppercase tracking-wider mt-1">{paymentSaved.time}</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="border border-[#000000] bg-transparent hover:bg-[#000000] hover:text-[#FFFFFF] text-[#000000] px-6 py-[16px] rounded-none w-full mt-6 cursor-pointer uppercase tracking-[0.1em] text-[13px] font-bold transition-colors"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export default OrderPlace;
