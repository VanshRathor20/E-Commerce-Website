import React from "react";
import bannerImage from "../../assets/banner.jpg";

const Banner = () => {
  return (
    <section
      className="w-full mx-auto bg-white h-[70vh] flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImage})` }}>

        <div className="w-full mx-auto h-full px-10 flex justify-center flex-col gap-5">
          <h1 className="text-red-600 font-bold uppercase text-9xl tracking-tight">
            Big Sale!
          </h1>

          <h2 className="text-zinc-800 text-3xl">
            Up to 50% OFF - Limited Time only!
          </h2>

          <div className="text-6xl font-bold text-zinc-800 flex gap-x-4 mt-7">
            <span className="text-white bg-zinc-800 p-4">00</span>:
            <span className="text-white bg-zinc-800 p-4">00</span>:
            <span className="text-white bg-zinc-800 p-4">00</span>
          </div>
        </div>
    </section>
  );
};

export default Banner;
