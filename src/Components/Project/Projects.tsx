"use client";

import React, { useState, useMemo, useCallback} from 'react';
import dynamic from 'next/dynamic';
import { ProjectGroup } from '@/Components/ProjectGroup';
import { CategoryButtons } from '@/Components/Project/CategoryButtons';
import { useProjects } from '@/hooks/useProjects';

const CardInformation = dynamic(() => import('@/Components/Project/Card/CardInformation'));

const Projects: React.FC = () => {
  const { categories: categoriesWithAll, projects } = useProjects();
  const [state, setState] = useState({
    selectedCategory: 'all' as string | null,
    selectedCard: null as number | null,
    isCardInfoVisible: false,
  });

  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];
    if (!state.selectedCategory || state.selectedCategory === 'all') return projects;
    return projects.filter(project => 
      project.projectDetails?.projectType === state.selectedCategory
    );
  }, [state.selectedCategory, projects]);

  const projectGroups = useMemo(() => {
    const halfLength = Math.ceil(filteredProjects.length / 2);
    return {
      topProjects: filteredProjects.slice(0, halfLength),
      bottomProjects: filteredProjects.slice(halfLength)
    };
  }, [filteredProjects]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setState(prev => ({
      ...prev,
      selectedCategory: prev.selectedCategory === categoryId ? 'all' : categoryId,
      selectedCard: null,
      isCardInfoVisible: false,
    }));
  }, []);

  const handleViewProject = useCallback((cardId: number) => {
    setState(prev => ({
      ...prev,
      selectedCard: cardId,
      isCardInfoVisible: true,
    }));

    // Scroll to CardInfo after a short delay
    setTimeout(() => {
      const cardInfoElement = document.querySelector(`[data-card-id="${cardId}"]`) as HTMLElement;
      if (cardInfoElement) {
        cardInfoElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  }, []);

  const handleCloseCardInfo = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCardInfoVisible: false,
      selectedCard: null,
    }));
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Work</h1>
        <p className="text-xl max-w-2xl mx-auto mb-12">
          Custom B2C, B2B and eCommerce solutions optimized for traffic, 
          engagement and conversion.
        </p>

        <CategoryButtons 
          categories={categoriesWithAll}
          selectedCategory={state.selectedCategory}
          onSelect={handleCategorySelect}
        />
      </div>

      <div>
        {filteredProjects.length > 0 ? (
          <>
            <ProjectGroup 
              projects={projectGroups.topProjects}
              onViewProject={handleViewProject}
              selectedCard={state.selectedCard}
              renderCardInfo={(cardId) => (
                <div className="sm:hidden my-8">
                  <CardInformation
                    selectedButton={state.selectedCategory}
                    selectedCard={cardId}
                    onClose={handleCloseCardInfo}
                  />
                </div>
              )}
            />

            {state.isCardInfoVisible && state.selectedCard && projectGroups.topProjects.some(project => project.id === state.selectedCard) && (
              <div 
                data-card-id={state.selectedCard}
                className="hidden sm:block my-8"
              >
                <CardInformation
                  selectedButton={state.selectedCategory}
                  selectedCard={state.selectedCard}
                  onClose={handleCloseCardInfo}
                />
              </div>
            )}

            <ProjectGroup 
              projects={projectGroups.bottomProjects}
              onViewProject={handleViewProject}
              selectedCard={state.selectedCard}
              renderCardInfo={(cardId) => (
                <div className="sm:hidden my-8">
                  <CardInformation
                    selectedButton={state.selectedCategory}
                    selectedCard={cardId}
                    onClose={handleCloseCardInfo}
                  />
                </div>
              )}
            />

            {state.isCardInfoVisible && state.selectedCard && projectGroups.bottomProjects.some(project => project.id === state.selectedCard) && (
              <div 
                data-card-id={state.selectedCard}
                className="hidden sm:block my-8"
              >
                <CardInformation
                  selectedButton={state.selectedCategory}
                  selectedCard={state.selectedCard}
                  onClose={handleCloseCardInfo}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-white py-12">
            No hay proyectos para esta categoría
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;