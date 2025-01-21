import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ProjectCard } from '@/Components/types/project';

interface ProjectGroupProps {
  projects: ProjectCard[];
  onViewProject: (id: number) => void;
  selectedCard: number | null;
  renderCardInfo: (cardId: number) => React.ReactNode;
}

export const ProjectGroup: React.FC<ProjectGroupProps> = React.memo(({ projects, onViewProject, selectedCard, renderCardInfo }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
    {projects
      .filter(card => card && card.id && (card.backgroundImage || card.imageUrl))
      .map((card) => (
        <div key={`project-${card.id}`}>
          <div 
            className="relative w-full group overflow-hidden rounded-xl shadow-lg"
          >
            {/* Image container */}
            <div className="relative w-full h-[400px] md:h-[500px] z-10">
              <Image
                src={
                  card.backgroundImage 
                    ? urlFor(card.backgroundImage).url() 
                    : (card.imageUrl || '/placeholder-project.jpg')
                }
                alt={card.altText || card.title || 'Project image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover w-auto h-auto group-hover:scale-105 transition-transform duration-300"
                unoptimized
                priority={false}
                onError={(e) => {
                  console.error('Image load error:', e);
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500?text=Image+Error';
                }}
              />
              
              {/* Project overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => onViewProject(card.id)}
                  className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label={`View details for ${card.altText || card.title}`}
                >
                  View Project
                </button>
              </div>
            </div>

            {/* Logo */}
            {card.logo && (
              <div className="absolute top-4 left-4 z-20 bg-white/70 p-2 rounded-lg">
                <Image
                  src={urlFor(card.logo).url()}
                  alt={`${card.altText || card.title} logo`}
                  width={150}
                  height={100}
                  className="w-60 h-60 object-contain"
                  onError={(e) => {
                    console.error('Logo load error:', e);
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Logo+Error';
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Render CardInformation for mobile */}
          {selectedCard === card.id && renderCardInfo(card.id)}
        </div>
      ))}
  </div>
));

ProjectGroup.displayName = 'ProjectGroup';