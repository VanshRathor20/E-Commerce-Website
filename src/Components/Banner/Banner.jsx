import React, { useEffect, useState } from "react";
import BannerImage from "../../assets/hero.svg";

const Banner = () => {
  // initial time (seconds)
  const initialTime = 5 * 60 * 60; // 5 hours
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Countdown effect: decrease `timeLeft` every second
  useEffect(() => {
    if (timeLeft <= 0) return undefined;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <section className="w-full h-[80vh] mx-auto flex flex-col lg:flex-row items-center relative px-4 sm:px-10 lg:px-20 pt-32 sm:pt-36 lg:pt-40">
      {/* Content Left Side */}
      <div className="w-full lg:w-[600px] px-4 sm:px-10 flex flex-col gap-3 sm:gap-5">
        <h1 className="text-[#1565C0] font-bold uppercase text-6xl sm:text-6xl lg:text-8xl xl:text-9xl tracking-tight ">
          Big <br /> Sale!
        </h1>

        <h2 className="text-zinc-800 text-lg sm:text-2xl lg:text-3xl mt-5 lg:mt-20">
          Up to 50% OFF - Limited Time only!
        </h2>

        <div className="text-2xl sm:text-4xl lg:text-6xl font-bold text-zinc-800 flex gap-x-2 sm:gap-x-4 mt-4 sm:mt-7">
          <span className="text-white bg-zinc-800 p-2 sm:p-4">{hours}</span>:
          <span className="text-white bg-zinc-800 p-2 sm:p-4">{minutes}</span>:
          <span className="text-white bg-zinc-800 p-2 sm:p-4">{seconds}</span>
        </div>
      </div>

      {/* Image Right Side */}
      <div className="w-full lg:flex-1 flex items-center mt-8 lg:mt-0 lg:justify-end">
        <img
          src={BannerImage}
          alt="banner image"
          loading="lazy"
          className="w-full max-w-[420px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-[760px] xl:max-w-[900px] h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Banner;
