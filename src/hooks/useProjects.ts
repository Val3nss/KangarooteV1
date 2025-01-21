// hooks/useProjects.ts
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { Category, ProjectCard } from '@/Components/types/project';

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

        const fetchedProjects = await client.fetch(projectsQuery);

        // Filtrar categorías que tienen proyectos asignados, excluyendo la categoría "All"
        const categoriesInUse: Category[] = predefinedCategories.filter((category: Category) =>
          category.projectType !== 'all' &&
          fetchedProjects.some((project: ProjectCard) => 
            project.projectDetails?.projectType === category.projectType
          )
        );

        // Agregar la categoría "All" al principio del array de categorías
        const allCategories = [predefinedCategories[0], ...categoriesInUse];

        setCategories(allCategories);
        setProjects(fetchedProjects.map((project: any) => ({
          ...project,
          category: {
            _id: project.projectDetails?.projectType || '',
            title: predefinedCategories.find(
              cat => cat.projectType === project.projectDetails?.projectType
            )?.title || ''
          }
        })));
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