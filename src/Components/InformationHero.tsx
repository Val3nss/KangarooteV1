"use client"

import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { PortableText } from '@portabletext/react'
import { FaGreaterThan, FaPlay } from "react-icons/fa"
import { fonts } from "./Fonts"
import ReviewsCostumers from "./ReviewsCostumers"
import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
const BRAND_COLORS = {
  green: "#53BD47",
  red: "#FF0000"
};

function urlFor(source: SanityImageSource): ReturnType<typeof builder.image> {
  return builder.image(source)
}

interface SanityImageSource {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

interface InfoHeroData {
  headline: string;
  subheading?: string;
  informationItems: string[];
  description: any[]; 
  links: { label: string; url: string }[];
  videoSectionTitle?: string;
  image?: { 
    _type: 'image', 
    asset: { 
      _ref: string, 
      _type: 'reference' 
    }; 
    alt?: string 
  };
  video?: { 
    _type: 'file', 
    asset: { 
      _ref: string, 
      _type: 'reference',
      url?: string 
    } 
  };
}

const InformationHero = () => {
  const [infoHeroData, setInfoHeroData] = useState<InfoHeroData | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const customComponents = {
    marks: {
      link: ({children, value}: any) => (
        <Link 
          href={value.href} 
          className={`text-[${BRAND_COLORS.green}] underline hover:text-[${BRAND_COLORS.red}] transition-colors duration-300`}
        >
          {children}
        </Link>
      )
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`*[_type == "informationHero"][0]{
          ...,
          "imageUrl": image.asset->url,
          "videoUrl": video.asset->url
        }`)
        
        setInfoHeroData(data)
        
        if (data.image?.asset?._ref) {
          const url = urlFor(data.image).url()
          setImageUrl(url)
        }
        
        if (data.videoUrl) {
          setVideoUrl(data.videoUrl)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  if (!infoHeroData) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="animate-pulse text-[#53BD47] text-xl">Loading...</div>
    </div>
  )

  return (
    <div className={`${fonts.robotoBold.className} bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 py-16 md:py-24`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <section className="space-y-6">
            <header>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left leading-tight 
                bg-clip-text text-transparent bg-gradient-to-r from-[#53BD47] to-[#FF0000]">
                {infoHeroData.headline}
              </h1>
              {infoHeroData.subheading && (
                <h2 className="text-xl text-gray-600 text-center md:text-left">
                  {infoHeroData.subheading}
                </h2>
              )}
            </header>

            {/* Information Items */}
            <div className="space-y-3">
              {infoHeroData.informationItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300"
                >
                  <FaGreaterThan className={`text-[${BRAND_COLORS.green}] group-hover:text-[${BRAND_COLORS.red}] transition-colors`} />
                  <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className={`${fonts.robotoRegular.className} text-lg text-gray-600 leading-relaxed`}>
              <PortableText 
                value={infoHeroData.description} 
                components={customComponents} 
              />
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {infoHeroData.links.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.url} 
                  className="px-6 py-3 bg-gradient-to-r from-[#53BD47] to-[#FF0000] hover:from-[#FF0000] hover:to-[#53BD47] 
                    rounded-full text-white transition-all duration-500 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

         {/* Image Section */}
          <section className="flex justify-center items-center py-8">
            {imageUrl ? (
              <div className="relative w-full max-w-3xl aspect-square group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#53BD47] to-[#FF0000] 
                  opacity-20 group-hover:opacity-30 blur transition-all duration-300" />
                <Image
                  src={imageUrl}
                  alt={infoHeroData.image?.alt || 'Hero Image'}
                  fill
                  className="relative object-contain hover:scale-105 transition-transform duration-500 ease-in-out rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            ) : (
              <div className="text-gray-600 text-lg">Image not available</div>
            )}
          </section>
        </div>

        {/* Video Section */}
        {videoUrl && (
          <div className="mt-16 bg-white/80 backdrop-blur rounded-xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-video group">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#53BD47]/20 to-[#FF0000]/20 
                  group-hover:from-[#53BD47]/30 group-hover:to-[#FF0000]/30 
                  flex items-center justify-center transition-all duration-300">
                  <FaPlay className="text-white text-4xl opacity-70 group-hover:opacity-100 
                    transform group-hover:scale-110 transition-all" />
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#53BD47] to-[#FF0000] bg-clip-text text-transparent">
                  {infoHeroData.videoSectionTitle || 'Explore Our Journey'}
                </h2>
                <p className="text-gray-600">
                  Discover more about our story, mission, and the impact we create.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewsCostumers />
        </div>
      </div>
    </div>
  )
}

export default InformationHero