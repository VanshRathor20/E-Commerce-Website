import React from 'react';

const About = () => {
  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* Hero Banner */}
      <div className="w-full h-[300px] bg-[#000000] flex flex-col items-center justify-center text-center">
        <div className="w-[60px] h-[1px] bg-[#FFFFFF] mb-6"></div>
        <h1 className="text-[#FFFFFF] uppercase tracking-[0.12em] text-[clamp(40px,6vw,80px)] font-bold">
          OUR STORY
        </h1>
        <p className="text-[13px] tracking-[0.25em] text-[rgba(255,255,255,0.6)] mt-4 uppercase font-[500]">
          CRAFTED WITH PURPOSE
        </p>
      </div>

      <div className="section-wrapper w-full max-w-[1280px] mx-auto min-h-screen">
        <div className="section-heading-container" data-aos="fade-up">
           <span className="section-label">WHO WE ARE</span>
           <h2 className="section-title">THE FASHION STORE STORY</h2>
           <div className="section-underline"></div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center mb-24">
            <div className="flex-1 text-[#757575] leading-[1.8] text-[15px]" data-aos="fade-up">
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
            <div className="flex-1 w-full relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]" data-aos="fade-up" data-aos-delay="200">
              <img 
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop" 
                alt="Fashion Story" 
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
          </div>

          {/* 3 Values Section */}
          <div className="w-full flex justify-center mb-16">
            <div className="section-heading-container" data-aos="fade-up">
               <span className="section-label">OUR VALUES</span>
               <h2 className="section-title">WHAT DRIVES US</h2>
               <div className="section-underline"></div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {["QUALITY", "STYLE", "SUSTAINABILITY"].map((val, idx) => (
              <div 
                key={idx} 
                className="border border-[#E1E1E1] p-[48px] flex items-center justify-center bg-[#FFFFFF] hover:bg-[#F9F9F9] transition-colors cursor-default"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <h3 className="text-[#000000] font-bold uppercase tracking-[0.1em] text-[14px]">
                  {val}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
