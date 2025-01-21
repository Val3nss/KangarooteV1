"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { motion, AnimatePresence } from 'framer-motion';
import { groq } from 'next-sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source).url();

interface ServiceCard {
  icon: SanityImageSource;
  title: string;
  description: string;
  image: SanityImageSource;
}

interface ServiceHero {
  superheading?: string;
  headline: string;
  description: [];
  featuredImage?: SanityImageSource;
  serviceCards: ServiceCard[];
}

const ServiceCard = ({ service, isMobile }: { service: ServiceCard, isMobile: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
    <>
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="
          bg-gradient-to-br from-[#53BD47]/10 to-[#FF0000]/10
          p-2 sm:p-2.5
          rounded-full 
          relative 
          w-10 h-10 sm:w-14 sm:h-14
          flex items-center justify-center
          transition-all duration-300
        ">
          <Image 
            src={urlFor(service.icon)}
            alt={service.title} 
            fill
            sizes="(max-width: 768px) 40px, 56px"
            style={{ objectFit: 'contain', padding: '0.25rem' }}
            className={isMobile ? '' : 'group-hover:scale-110 transition-transform'}
          />
        </div>
        <h3 className="
          text-lg sm:text-xl md:text-3xl
          font-bold 
          bg-gradient-to-r from-[#53BD47] to-[#FF0000] 
          bg-clip-text text-transparent
          transition-all duration-300
        ">
          {service.title}
        </h3>
      </div>
      
      <p className="
        text-gray-600
        text-sm sm:text-base md:text-lg 
        mt-2
        leading-relaxed 
        transition-colors duration-300
      ">
        {service.description}
      </p>
    </>
  );

  if (isMobile) {
    return (
      <div className="
        bg-white/95 
        rounded-xl 
        p-4
        border border-gray-100 
        shadow-md
      ">
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div 
      className="
        group 
        bg-white 
        rounded-3xl 
        p-5 sm:p-7 md:p-9 
        transition-all duration-300 
        relative 
        overflow-hidden 
        border border-gray-100 
        hover:border-[#53BD47]/20 
        shadow-xl 
        hover:shadow-2xl
        w-full
        md:hover:w-[130%]
      "
      animate={{ width: isHovered ? "130%" : "100%" }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-xl">
        {cardContent}
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute top-10 z-10 right-[5%] w-64 h-52"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="relative w-full h-full">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#53BD47]/20 to-[#FF0000]/20 
                blur-md rounded-lg transition-all duration-300" />
              <Image
                src={urlFor(service.image)}
                alt={`${service.title} image`}
                fill
                sizes="256px"
                style={{
                  objectFit: 'contain',
                  borderRadius: '0.5rem',
                }}
                className="relative bg-white shadow-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WebServices = () => {
  const [data, setData] = useState<ServiceHero | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const query = groq`
        *[_type == "serviceHero"][0] {
          superheading,
          headline,
          description,
          featuredImage,
          serviceCards[] {
            icon,
            title,
            description,
            image
          }
        }
      `;
      
      try {
        const result: ServiceHero = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderHeader = () => (
    <div className="text-center lg:text-left">
      {data?.superheading && (
        <div className="inline-block bg-gradient-to-r from-[#53BD47]/10 to-[#FF0000]/10 
          rounded-full p-1 mb-4">
          <span className="text-sm font-bold bg-gradient-to-r from-[#53BD47] to-[#FF0000]
            bg-clip-text text-transparent tracking-wide uppercase px-4 py-1">
            {data.superheading}
          </span>
        </div>
      )}
      <h2 className="
        text-2xl sm:text-4xl md:text-5xl 
        font-bold mb-6 
        bg-gradient-to-r from-[#53BD47] to-[#FF0000] 
        bg-clip-text text-transparent
      ">
        {data?.headline}
      </h2>
      <div className="text-sm sm:text-base md:text-xl text-gray-600">
        <PortableText value={data?.description || []} />
      </div>
    </div>
  );

  const renderFeaturedImage = () => (
    data?.featuredImage && (
      <div className="w-full lg:w-4/5 group relative mb-8">
        <div className="absolute -inset-3 bg-gradient-to-r from-[#53BD47]/10 to-[#FF0000]/10 
          opacity-75 group-hover:opacity-100 blur-xl rounded-[2rem] transition-all duration-300" />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl" />
        <Image
          src={urlFor(data.featuredImage)}
          alt={data.headline}
          width={600}
          height={400}
          className="relative rounded-2xl shadow-lg transform group-hover:scale-[1.02] transition-all duration-300"
        />
      </div>
    )
  );

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[200px] bg-gray-50">
        <div className="inline-block h-10 w-10 animate-spin rounded-full 
          border-4 border-solid border-[#53BD47] border-r-transparent">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <section className="w-full bg-gradient-to-br from-[#F9FDF9] via-white to-[#FFF9F9] text-gray-900 py-6
        border-t border-b border-[#53BD47]/10">
        <div className="container mx-auto px-4">
          {renderHeader()}
          <div className="flex flex-col gap-4 mt-6">
            {data.serviceCards?.map((service, index) => (
              <ServiceCard key={index} service={service} isMobile={true} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex w-full bg-gradient-to-br from-[#F9FDF9] via-white to-[#FFF9F9] text-gray-900 py-12 md:py-16 lg:py-24 
      border-t border-b border-[#53BD47]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-32 lg:overflow-y-auto">
            {renderHeader()}
            {renderFeaturedImage()}
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8">
            {data.serviceCards?.map((service, index) => (
              <ServiceCard key={index} service={service} isMobile={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebServices;