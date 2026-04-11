import React from 'react';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const navigate = useNavigate();
  const collections = [
    { title: "BEAUTY", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop" },
    { title: "FRAGRANCES", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop" },
    { title: "FURNITURE", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop" }
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
              onClick={() => navigate('/')}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-[#FFFFFF] uppercase tracking-[0.2em] font-bold text-[24px]">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
