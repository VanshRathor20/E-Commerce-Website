import React from "react";
import BannerImage from "../../assets/Baner.jpg";

const Banner = () => {
  return (
    // <section
    //   className="w-full mx-auto bg-white h-[70vh] flex justify-center items-center bg-cover bg-center"
    //   style={{ backgroundImage: `url(${BannerImage})` }}>

    <section className="w-full h-[80vh] mx-auto flex flex-col lg:flex-row items-center relative px-4 sm:px-10 lg:px-20 pt-32 sm:pt-36 lg:pt-40"> 
        {/* Content Left Side */}
        <div className="w-full lg:w-[600px] px-4 sm:px-10 flex flex-col gap-3 sm:gap-5">
          <h1 className="text-red-600 font-bold uppercase text-6xl sm:text-6xl lg:text-8xl xl:text-9xl tracking-tight ">
            Big <br /> Sale!
          </h1>

          <h2 className="text-zinc-800 text-lg sm:text-2xl lg:text-3xl mt-5 lg:mt-20">
            Up to 50% OFF - Limited Time only!
          </h2>

          <div className="text-2xl sm:text-4xl lg:text-6xl font-bold text-zinc-800 flex gap-x-2 sm:gap-x-4 mt-4 sm:mt-7">
            <span className="text-white bg-zinc-800 p-2 sm:p-4">00</span>:
            <span className="text-white bg-zinc-800 p-2 sm:p-4">00</span>:
            <span className="text-white bg-zinc-800 p-2 sm:p-4">00</span>
          </div>
        </div>

        {/* Image Right Side */}
        <div className="w-full lg:w-[1000px] h-[300px] sm:h-[400px] lg:h-full flex items-center justify-center mt-8 lg:mt-0 ">
          <img 
            src={BannerImage} 
            alt="banner image" 
            className="w-full h-full object-contain"
          />
        </div>

    </section>
  );
};

export default Banner;
