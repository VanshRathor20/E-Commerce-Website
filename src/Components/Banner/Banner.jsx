import React from "react";

const Banner = () => {
  return (
    <section 
      className="w-full min-h-[90vh] relative flex flex-col items-center justify-center bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25 z-0"></div>

      {/* Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center gap-y-10 text-center px-4"
        data-aos="fade-up"
      >
        <h1 className="text-fashion-white font-bold uppercase tracking-[0.15em]" style={{ fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1.1 }}>
          FASHION<br/>STORE
        </h1>

        <button 
          className="bg-fashion-black text-fashion-white uppercase font-semibold text-[13px] tracking-widest px-10 py-4 transition-colors hover:bg-[#575757]"
          onClick={(e) => {
             e.preventDefault();
             const section = document.getElementById("products-section");
             if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
        >
          SHOP NOW
        </button>
      </div>
    </section>
  );
};

export default Banner;
