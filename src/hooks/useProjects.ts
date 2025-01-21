import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { Category, ProjectCard } from '@/Components/types/project';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Define an interface that matches the ProjectCard type more closely
interface FetchedProject {
  id: number;
  title: string;
  imageUrl?: string;
  logoUrl?: string;
  altText: string;
  backgroundImage?: any;
  projectDetails?: {
    projectType: string;
    client?: string;
    technologies?: string[];
  };
}

const predefinedCategories = [
  { _id: 'all', title: 'All', icon: 'FaList', projectType: 'all' },
  { _id: 'latest', title: 'Latest', icon: 'FaStar', projectType: 'latest' },
  { _id: 'b2b', title: 'B2B', icon: 'FaBuilding', projectType: 'b2b' },
  { _id: 'bc2', title: 'B2C', icon: 'FaUsers', projectType: 'bc2' },
  { _id: 'ecommerce', title: 'E-Commerce', icon: 'FaShoppingCart', projectType: 'ecommerce' }
];

export const useProjects = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<ProjectCard[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsQuery = `*[_type == "cardInfo"] {
          id,
          title,
          "imageUrl": mainImage.asset->url,
          "logoUrl": logo.asset->url,
          "altText": title,
          backgroundImage,
          projectDetails {
            projectType,
            client,
            technologies
          }
        }`;

        const fetchedProjects: FetchedProject[] = await client.fetch(projectsQuery);

        // Filtrar categorías que tienen proyectos asignados, excluyendo la categoría "All"
        const categoriesInUse: Category[] = predefinedCategories.filter(category =>
          category.projectType !== 'all' &&
          fetchedProjects.some(project => 
            project.projectDetails?.projectType === category.projectType
          )
        );

        // Agregar la categoría "All" al principio del array de categorías
        const allCategories = [predefinedCategories[0], ...categoriesInUse];

        // Ensure projectDetails has a projectType
        const processedProjects: ProjectCard[] = fetchedProjects.map(project => ({
          ...project,
          projectDetails: {
            projectType: project.projectDetails?.projectType || '',
            client: project.projectDetails?.client,
            technologies: project.projectDetails?.technologies
          },
          category: {
            _id: project.projectDetails?.projectType || '',
            title: predefinedCategories.find(
              cat => cat.projectType === project.projectDetails?.projectType
            )?.title || ''
          }
        }));

        setCategories(allCategories);
        setProjects(processedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setCategories([]);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  return { categories, projects };
};