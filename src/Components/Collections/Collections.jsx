import React from "react";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const navigate = useNavigate();
  const collections = [
    {
      title: "BEAUTY",
      subtitle: "Makeup & Skincare",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
      category: "beauty",
    },
    {
      title: "GROOMING",
      subtitle: "Skincare & Wellness",
      image:
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800",
      category: "grooming",
    },
    {
      title: "FRAGRANCE",
      subtitle: "Perfumes & Scents",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800",
      category: "fragrance",
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="w-full h-[400px] bg-[#000000] flex flex-col items-center justify-center text-center">
        <div className="w-[60px] h-[1px] bg-[#FFFFFF] mb-6"></div>
        <h1 className="text-[#FFFFFF] uppercase tracking-[0.12em] text-[clamp(40px,6vw,80px)] font-bold">
          OUR COLLECTIONS
        </h1>
        <p className="text-[13px] tracking-[0.25em] text-[rgba(255,255,255,0.6)] mt-4 uppercase font-[500]">
          EXPLORE OUR CURATED EDIT
        </p>
      </div>

      {/* Category Cards */}
      <div className="section-wrapper max-w-[1280px] mx-auto">
        <div className="section-heading-container" data-aos="fade-up">
          <span className="section-label">CURATED SELECTION</span>
          <h2 className="section-title">SHOP BY CATEGORY</h2>
          <div className="section-underline"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {collections.map((cat, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer bg-[#F5F5F5]"
              onClick={() => navigate(`/?category=${cat.category}`)}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500" />
              <div className="absolute inset-x-0 bottom-10 text-center transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-[#FFFFFF] uppercase tracking-[0.2em] font-bold text-[14px] mb-2">
                  {cat.title}
                </h3>
                <p className="text-[#FFFFFF] text-[12px] tracking-[0.1em] uppercase opacity-90">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
