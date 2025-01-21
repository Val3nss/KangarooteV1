"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const LOGOS = [
  { id: 1, src: "/LogosSlider/1.jpg", alt: "Company 1" },
  { id: 2, src: "/LogosSlider/2.webp", alt: "Company 2" },
  { id: 3, src: "/LogosSlider/3.png", alt: "Company 3" },
  { id: 4, src: "/LogosSlider/4.png", alt: "Company 4" },
  { id: 5, src: "/LogosSlider/5.jpg", alt: "Company 5" },
];

const SliderPattern = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    drag: true,
    slides: {
      perView: 'auto',
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: {
          perView: 2,
          spacing: 8,
        },
      },
      "(max-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 12,
        },
      },
    },
    defaultAnimation: {
      duration: 1000,
    },
  });

  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-white py-4">
      <div className="w-full px-4">
        <div 
          ref={sliderRef} 
          className="keen-slider flex items-center justify-center"
        >
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className="keen-slider__slide flex items-center justify-center px-2"
            >
              <div 
                className="relative w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-12 
                transition-transform duration-300 
                hover:scale-110 
                grayscale hover:grayscale-0 
                opacity-60 hover:opacity-100"
              >
                <Image
                  fill
                  src={logo.src}
                  alt={logo.alt}
                  className="object-contain"
                  sizes="(max-width: 640px) 100px, (max-width: 1024px) 160px, 200px"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderPattern;