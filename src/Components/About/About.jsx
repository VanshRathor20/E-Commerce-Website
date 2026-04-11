import React from 'react';

const About = () => {
  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen py-20 px-5 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <h1 className="text-[#000000] font-bold uppercase tracking-[0.2em] text-3xl md:text-5xl mb-16 text-center">
          OUR STORY
        </h1>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center max-w-5xl">
          <div className="flex-1 text-[#757575] leading-[1.8] text-[15px]">
            <p className="mb-6">
              Founded on the principles of minimalist design and uncompromising quality, Fashion Store emerged from a desire to create timeless pieces that transcend seasonal trends.
            </p>
            <p className="mb-6">
              We believe that true elegance lies in simplicity. Our approach strips away the unnecessary, focusing entirely on silhouette, texture, and tailoring. Every garment is a testament to the idea that wardrobe essentials should be both beautiful and highly functional.
            </p>
            <p>
              From our studio to your closet, we maintain an unwavering commitment to responsible sourcing and precision craftsmanship. We aren't just making clothes; we are defining a lifestyle built around purposeful aesthetic choices.
            </p>
          </div>
          <div className="flex-1 w-full relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
            <img 
              src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop" 
              alt="Fashion Story" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3 Values Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl">
          {["QUALITY", "STYLE", "SUSTAINABILITY"].map((val, idx) => (
            <div key={idx} className="border border-[#E1E1E1] p-12 flex items-center justify-center bg-white hover:bg-[#F9F9F9] transition-colors">
              <h3 className="text-[#000000] font-bold uppercase tracking-widest text-[14px]">
                {val}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
