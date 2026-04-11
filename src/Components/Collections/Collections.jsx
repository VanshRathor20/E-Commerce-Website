import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Collections = () => {
  const collections = [
    { title: "BEAUTY", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop" },
    { title: "FRAGRANCES", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop" },
    { title: "FURNITURE", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop" }
  ];

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen">
      {/* Hero Banner */}
      <div className="w-full h-[400px] bg-[#000000] flex items-center justify-center">
        <h1 className="text-[#FFFFFF] uppercase tracking-[0.2em] text-3xl md:text-5xl font-bold">
          OUR COLLECTIONS
        </h1>
      </div>

      {/* Category Cards */}
      <div className="max-w-7xl mx-auto py-20 px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((cat, idx) => (
            <div key={idx} className="relative aspect-[3/4] overflow-hidden group cursor-pointer bg-[#F5F5F5]">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-[#FFFFFF] uppercase tracking-widest font-bold text-2xl">
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
