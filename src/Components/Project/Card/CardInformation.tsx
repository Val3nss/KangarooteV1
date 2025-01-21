"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

/* eslint-disable @typescript-eslint/no-explicit-any */


interface Thumbnail {
  src: string;
  alt: string;
  mainImage: string;
}

interface CardInfoData {
  id: number;
  title: string;
  mainImage: {
    asset: {
      url: string;
    }
  };
  logo: {
    asset: {
      url: string;
    }
  };
  miniatures: Array<{
    asset: {
      url: string;
    }
  }>;
  description: []; 
  backgroundImage?: {
    asset: {
      url: string;
    }
  };
  projectDetails: {
    client?: string;
    technologies?: string[];
    projectType?: string;
  };
}

interface CardInformationProps {
  selectedButton: string | null;
  selectedCard: number; 
  onClose: () => void;
}

const RichTextComponents = {
  block: {
    normal: ({children}: any) => <p className="text-base leading-relaxed">{children}</p>,
  }
};

const CardInformation: React.FC<CardInformationProps> = ({ 
  selectedCard, 
  onClose 
}) => {
  const [isClient, setIsClient] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfoData | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para marcar que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Efecto para cargar la información de la tarjeta
  useEffect(() => {
    if (!isClient) return;

    const fetchCardInfo = async () => {
      try {
        setIsLoading(true);
        
        // Consulta para obtener un proyecto específico por su ID
        const query = `*[_type == "cardInfo" && id == $selectedCard][0] {
          id,
          title,
          mainImage,
          logo,
          miniatures,
          description,
          backgroundImage,
          "projectDetails": {
            client,
            technologies,
            projectType
          }
        }`;
        
        const data = await client.fetch(query, { selectedCard });

        if (data) {
          setCardInfo(data);
          
          // Preparar thumbnails
          const thumbs: Thumbnail[] = data.miniatures.map((Image: SanityImageSource, index: number) => ({
            src: urlFor(Image).width(172).height(103).url(),
            alt: `Thumbnail ${index + 1}`,
            mainImage: urlFor(Image).url()
          }));
          
          setThumbnails(thumbs);
          setMainImage(urlFor(data.mainImage).url());
        }
      } catch (error) {
        console.error('Error fetching card info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Solo fetch si hay un selectedCard y estamos en el cliente
    if (selectedCard) {
      fetchCardInfo();
    }
  }, [selectedCard, isClient]);

  // Renderizado condicional si aún no estamos en el cliente
  if (!isClient) {
    return null;
  }

  // Estado de carga
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-white"></div>
      </div>
    );
  }

  // Sin información
  if (!cardInfo) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 text-white text-2xl">
        No se encontró información
      </div>
    );
  }

  return (
    <>
      <div className="flex relative z-50 justify-end h-[5px] bg-blue-400 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <button
          className="h-10 w-14 bg-blue-400 relative focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg"
          aria-label="Cerrar carta"
          onClick={onClose}
        >
          X
        </button>
      </div>

      {/* Versión Móvil */}
      <div 
        className="md:hidden relative bg-cover bg-center min-h-screen  overflow-hidden" 
        style={{ 
          backgroundImage: cardInfo.backgroundImage 
            ? `url(${urlFor(cardInfo.backgroundImage).url()})` 
            : `url("/messi.webp")` 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="space-y-4">
          {cardInfo.logo && (
            <div className=" rounded-lg p-4">
              <div className="relative h-[120px] max-w-[200px] mx-auto">
                <Image
                  src={urlFor(cardInfo.logo).url()}
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 200px) 100vw, 200px"
                  priority
                />
              </div>
            </div>
          )}
        
          <div className="relative z-20 flex flex-col p-4 space-y-6 max-w-lg mx-auto">
            {/* Thumbnails Carousel */}
            <div className="bg-white rounded-lg p-3">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <div className="flex gap-3 pb-2">
                  {thumbnails.map((thumbnail, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 transform hover:scale-105 ${
                        mainImage === thumbnail.mainImage ? "ring-4 ring-blue-500 ring-offset-2" : ""
                      }`}
                      onClick={() => setMainImage(thumbnail.mainImage)}
                    >
                      <Image
                        src={thumbnail.src}
                        alt={thumbnail.alt}
                        width={120}
                        height={72}
                        className="w-auto h-auto object-cover"
                        priority
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

{/* Imagen Principal para móvil */}
<div className="relative h-[350px] w-full overflow-y-auto rounded-lg shadow-lg">
  <Image
    src={mainImage}
    alt="Main project image"
    layout="intrinsic" // Cambié fill por intrinsic para manejar el tamaño
    width={1000}  // Usa un valor adecuado según la imagen original
    height={350}  // Establece la altura de la imagen según la altura del contenedor
    className="object-cover"
    priority
    quality={90}
  />
</div>

                
            <div className="bg-ofcgreen rounded-lg p-6 shadow-lg relative overflow-hidden">
              {cardInfo.backgroundImage && (
                <div 
                  className="absolute inset-0 opacity-20 bg-cover bg-center z-0" 
                  style={{ 
                    backgroundImage: `url(${urlFor(cardInfo.backgroundImage).url()})` 
                  }}
                />
              )}
              <div className="relative z-10 space-y-4">
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {cardInfo.title}
                </h2>
                <div className="space-y-4 text-white">
                  <PortableText 
                    value={cardInfo.description} 
                    components={RichTextComponents} 
                  />
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md">
                    Ver más
                  </button>
                  <button className="w-full px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium shadow-md">
                    Contactar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versión Desktop */}
      <div 
        className="hidden md:flex relative border-2 flex-col lg:flex-row p-6 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-cover bg-center h-full" 
        style={{ 
          backgroundImage: cardInfo.backgroundImage 
            ? `url(${urlFor(cardInfo.backgroundImage).url()})` 
            : `url("/messi.webp")`, 
          objectFit: 'cover' 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

        <div className="flex flex-col items-center justify-center z-20">
          <div className="space-y-10 bg-white w-full p-10">
            {thumbnails.map((thumbnail, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onClick={() => setMainImage(thumbnail.mainImage)}
              >
                <Image
                  src={thumbnail.src}
                  alt={thumbnail.alt}
                  width={150}
                  height={64}
                  className={`rounded-md ${mainImage === thumbnail.mainImage ? "ring-4 ring-blue-500" : ""}`}
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full h-screen overflow-hidden z-20">
          <div className="h-full overflow-y-scroll scrollbar-hidden">
            <Image
              src={mainImage}
              alt="Main image"
              width={705}
              height={2368}
              className="rounded-md w-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center rounded-lg mt-4 lg:mt-0 w-full max-w-md mx-auto z-20">
          <div className="flex justify-center mb-2">
            {cardInfo.logo && (
              <Image
                src={urlFor(cardInfo.logo).url()}
                alt="Logo"
                width={180}
                height={36}
                className="mx-auto"
              />
            )}
          </div>

          <div className="bg-ofcgreen w-full rounded-md shadow-lg p-8 relative overflow-hidden">
            {cardInfo.backgroundImage && (
              <div 
                className="absolute inset-0 opacity-20 bg-cover bg-center z-0" 
                style={{ 
                  backgroundImage: `url(${urlFor(cardInfo.backgroundImage).url()})` 
                }}
              />
            )}
            <div className="relative z-10 mb-2 m-4">
              <h2 className="text-3xl font-semibold text-white mb-2 w-full">
                {cardInfo.title}
              </h2>
              <div className="text-lg text-white leading-relaxed w-full">
                <PortableText 
                  value={cardInfo.description} 
                  components={RichTextComponents} 
                />
              </div>

              <div className="py-6 space-x-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Ver más
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInformation;