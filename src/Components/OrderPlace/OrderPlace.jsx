import React, { useEffect, useState } from "react";

const OrderPlace = ({ subtotal = 1000, onClose }) => {
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    console.log("OrderPlace mounted, subtotal:", subtotal);
  }, []);

  const total = (typeof subtotal === "number" ? subtotal : 0).toFixed(2);
  const upiId = "yourupiid@upi";

  // Build URL simply - no encoding issues
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${upiId}&am=${total}&cu=INR`;
  const fallbackUrl = `https://quickchart.io/qr?text=upi://pay?pa=${upiId}&am=${total}&size=250`;

  const handleGenerateQR = () => {
    console.log("QR URL:", qrUrl);
    setShowQR(true);
  };

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
          <div
            className="animate-fade-in-up"
            style={{
              textAlign: "center",
              marginTop: "24px",
              marginBottom: "32px",
            }}
          >
            <img
              src={qrUrl}
              alt="UPI Payment QR Code"
              width={250}
              height={250}
              style={{
                border: "1px solid #E1E1E1",
                display: "block",
                margin: "0 auto",
              }}
              onLoad={() => console.log("QR loaded successfully")}
              onError={(e) => {
                console.log("QR failed, trying backup URL");
                e.target.src = fallbackUrl;
                // Double fallback just in case
                e.target.onerror = () => {
                  console.log(
                    "Fallback also failed, using simplistic data string.",
                  );
                  e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PaymentOf${total}`;
                };
              }}
            />
            <p
              style={{
                fontSize: "12px",
                color: "#757575",
                marginTop: "16px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Scan with any UPI app to pay ₹{total}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#757575",
                marginTop: "4px",
              }}
            >
              UPI ID: {upiId}
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
