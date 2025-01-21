"use client"

import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { groq } from 'next-sanity';

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source)?.url() || '';

// Colores principales de la marca
const BRAND_COLORS = {
  green: "#53BD47",
  red: "#FF0000"
};

type PlatformCard = {
  icon: SanityImageSource;
  title: string;
  description: string;
  link?: string;
  linkText: string;
  lineColor: string;
  hoverClass: string;
};

type CmsPlatformData = {
  superheading?: string;
  headline: string;
  description: [];
  featuredImage?: SanityImageSource;
  platformCards: PlatformCard[];
};

const PlatformButton = ({ href, text }: { href?: string; text: string }) => {
  const ButtonContent = () => (
    <>
      {text}
      <svg 
        className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
          clipRule="evenodd" 
        />
      </svg>
    </>
  );

  const baseClasses = `
    group
    inline-flex items-center gap-2 px-6 py-3.5
    bg-gradient-to-r from-[${BRAND_COLORS.green}] to-[${BRAND_COLORS.red}]
    text-white text-sm font-medium rounded-full 
    shadow-lg hover:shadow-xl
    transform hover:-translate-y-0.5
    transition-all duration-300
  `;

  return href ? (
    <Link href={href} className={baseClasses}>
      <ButtonContent />
    </Link>
  ) : (
    <button className={baseClasses}>
      <ButtonContent />
    </button>
  );
};

const PlatformCard = ({ 
  icon, 
  title, 
  description, 
  link, 
  linkText, 
  lineColor,
  hoverClass 
}: PlatformCard) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <article 
      className="relative w-full overflow-hidden rounded-2xl shadow-lg p-6 
        border border-gray-100 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`absolute inset-0 transition-all duration-300 rounded-2xl`}
        style={{
          background: hoverClass || 'linear-gradient(to right, #3B82F6, #2563EB)',
          opacity: isHovered && !isMobile ? 0.9 : 0,
        }}
      />
      
      <div 
        className="absolute left-0 top-0 w-2 h-full rounded-l-2xl" 
        style={{ backgroundColor: lineColor }} 
      />
      
      <div className="relative z-10 flex flex-col sm:flex-row gap-6">
        <div className="w-20 h-20 flex-shrink-0">
          {icon && (
            <Image 
              src={urlFor(icon)} 
              alt={`${title} icon`} 
              width={80} 
              height={80} 
              className="object-contain w-full h-full"
            />
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${
            isHovered && !isMobile ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`transition-colors duration-300 ${
            isHovered && !isMobile ? 'text-white/90' : 'text-gray-600'
          }`}>
            {description}
          </p>
          <div className={`transition-opacity duration-300 ${
            !isHovered && !isMobile ? 'opacity-0' : 'opacity-100'
          }`}>
            <PlatformButton href={link} text={linkText} />
          </div>
        </div>
      </div>
    </article>
  );
};

const LoadingState = () => (
  <div className="p-16 text-center">
    <div className="inline-block h-10 w-10 animate-spin rounded-full 
      border-4 border-solid border-[#53BD47] border-r-transparent 
      motion-reduce:animate-[spin_1.5s_linear_infinite]" 
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="p-16 text-center">
    <div className="inline-flex items-center gap-2 font-medium text-[#FF0000]" role="alert">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
          clipRule="evenodd" 
        />
      </svg>
      {message}
    </div>
  </div>
);

export default function CMSPlatformsSection() {
  const [cmsData, setCmsData] = useState<CmsPlatformData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCmsPlatforms = async () => {
      const query = groq`
        *[_type == "cmsPlatforms"][0] {
          superheading,
          headline,
          description,
          featuredImage,
          platformCards[] {
            icon,
            title,
            description,
            link,
            linkText,
            lineColor,
            hoverClass
          }
        }
      `;
      
      try {
        const result = await client.fetch(query);
        setCmsData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCmsPlatforms();
  }, []);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!cmsData) return null;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-10">
            <div className="max-w-2xl">
              {cmsData.superheading && (
                <div className="inline-block bg-gradient-to-r from-[#53BD47]/10 to-[#FF0000]/10 
                  rounded-full p-1 mb-6">
                  <span className="text-sm font-bold bg-gradient-to-r from-[#53BD47] to-[#FF0000]
                    bg-clip-text text-transparent tracking-wide uppercase px-4 py-1">
                    {cmsData.superheading}
                  </span>
                </div>
              )}
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold 
                bg-gradient-to-r from-[#53BD47] to-[#FF0000]
                bg-clip-text text-transparent leading-tight mb-6">
                {cmsData.headline}
              </h2>
              
              <div className="text-lg text-gray-700 leading-relaxed">
                <PortableText value={cmsData.description} />
              </div>
            </div>

            {cmsData.featuredImage && (
              <div className="relative group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#53BD47] to-[#FF0000]
                  opacity-20 group-hover:opacity-30 blur 
                  transition-all duration-300" 
                />
                <div className="relative rounded-3xl overflow-hidden">
                  <Image 
                    src={urlFor(cmsData.featuredImage)} 
                    alt="CMS Platform Preview" 
                    width={700} 
                    height={358} 
                    quality={90}
                    className="w-full h-auto shadow-xl 
                      group-hover:shadow-2xl transition-all duration-300 
                      transform group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            {cmsData.platformCards?.map((platform, index) => (
              <PlatformCard key={`platform-${index}`} {...platform} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}