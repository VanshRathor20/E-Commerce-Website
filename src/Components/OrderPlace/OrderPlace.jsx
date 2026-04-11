import React, { useState } from "react";

const OrderPlace = ({ subtotal = 1000, onClose }) => {
  const [showQR, setShowQR] = useState(false);

  const total = (typeof subtotal === "number" ? subtotal : 0).toFixed(2);
  const upiId = "yourupiid@upi";

  const qrData = encodeURIComponent(
    `upi://pay?pa=${upiId}&am=${total}&cu=INR&tn=FashionStore`,
  );
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrData}`;

  const handleGenerateQR = () => setShowQR(true);

  return (
    <section className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 text-[#000000]">
      <div className="bg-[#FFFFFF] p-[40px] w-[90vw] md:w-full max-w-[480px] text-center border border-[#E1E1E1] rounded-none">
        <h1 className="text-[20px] font-bold mb-6 font-inter uppercase tracking-[0.1em] text-[#000000]">
          PLACE YOUR ORDER
        </h1>
        <p className="mb-8 text-[14px] text-[#000000] font-bold">
          TOTAL AMOUNT: ₹{total}
        </p>

        {!showQR && (
          <button
            onClick={handleGenerateQR}
            className="bg-[#000000] hover:bg-[#575757] text-[#FFFFFF] px-6 py-[16px] rounded-none w-full cursor-pointer uppercase tracking-[0.1em] text-[13px] font-bold transition-colors"
          >
            GENERATE PAYMENT QR
          </button>
        )}

        {showQR && (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <img
              key={qrUrl}
              src={qrUrl}
              width={220}
              height={220}
              alt="UPI QR"
              style={{
                display: "block",
                margin: "0 auto",
                border: "1px solid #E1E1E1",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://quickchart.io/qr?text=${qrData}&size=220`;
              }}
            />
            <p
              style={{
                marginTop: "16px",
                fontSize: "12px",
                color: "#757575",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Scan with Google Pay, PhonePe, or any UPI app
            </p>
            <p
              style={{
                marginTop: "4px",
                fontSize: "11px",
                color: "#757575",
              }}
            >
              Amount: ₹{total} | UPI: {upiId}
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="border border-[#000000] bg-[#FFFFFF] hover:bg-[#000000] hover:text-[#FFFFFF] text-[#000000] px-6 py-[16px] rounded-none w-full mt-2 cursor-pointer uppercase tracking-[0.1em] text-[13px] font-bold transition-all duration-300"
        >
          BACK TO HOME
        </button>
      </div>
    </section>
  );
};

export default OrderPlace;
