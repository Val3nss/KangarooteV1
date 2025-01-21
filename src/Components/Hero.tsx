"use client";

import { FaArrowRight } from "react-icons/fa";
import { fonts } from "./Fonts";
import SlidersPatheners from "./SlidersPatheners";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover absolute inset-0"
          src="/Webvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay (Gradient) */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center flex-grow px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        {/* Text Section */}
        <div className="text-white space-y-6 max-w-4xl">
          <div className="flex items-center space-x-3">
            <div className="h-1 w-16 bg-white/50"></div>
            <h2 
              className={`${fonts.robotoRegular.className} text-lg md:text-xl tracking-wide uppercase text-white/80`}
            >
              Premium Web Design Agency
            </h2>
          </div>

          <h1
            className={`${fonts.robotoBold.className} text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 leading-tight`}
          >
            We Grow
            <span className="block">Brands Online</span>
          </h1>

          <p
            className={`${fonts.robotoRegular.className} text-lg md:text-2xl mb-8 text-white/90 flex items-center space-x-2`}
          >
            <span>Custom Websites, Branding</span>
            <FaArrowRight className="text-white/70" />
            <span>Digital Marketing</span>
          </p>

          {/* Actions Section */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {/* Botones con estilo similar a InformationHero */}
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors duration-300 shadow-md">
              Get Started
            </button>
            <button className="px-6 py-3 bg-gray-600 hover:bg-gray-500 rounded-full text-white transition-colors duration-300 shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="relative z-10 w-full">
        <SlidersPatheners />
      </div>
    </div>
  );
};

export default Hero;