import React from "react";

const SaleStickyBar = () => {
  return (
    <div className="bg-fashion-black w-full overflow-hidden relative z-40 border-b border-fashion-border">
      <div className="bg-fashion-black py-3 animate-marquee">
        <p className="text-fashion-white uppercase tracking-[0.15em] text-[12px] font-semibold whitespace-nowrap px-4">
          EXTRA 15% OFF ALL SALE ITEMS. USE CODE <span className="font-bold underline">FASHION15</span> AT CHECKOUT &nbsp; • &nbsp; 
          FREE SHIPPING ON ALL ORDERS OVER $150 &nbsp; • &nbsp; 
          EXTRA 15% OFF ALL SALE ITEMS. USE CODE <span className="font-bold underline">FASHION15</span> AT CHECKOUT &nbsp; • &nbsp; 
          FREE SHIPPING ON ALL ORDERS OVER $150
        </p>
      </div>
    </div>
  );
};

export default SaleStickyBar;
