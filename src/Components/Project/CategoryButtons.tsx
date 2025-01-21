import React from 'react';
import * as Icons from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { Category } from '@/Components/types/project';

interface CategoryButtonsProps {
  categories: Category[]; // Define la estructura de Category en types/project
  selectedCategory: string | null;
  onSelect: (id: string) => void;
}

export const CategoryButtons: React.FC<CategoryButtonsProps> = React.memo(({ 
  categories, 
  selectedCategory, 
  onSelect 
}) => (
  <div className="flex flex-wrap justify-center gap-4 mb-12">
    {categories.map((category) => {
      // Asegúrate de que la propiedad "icon" de category sea válida antes de usarla.
      const IconComponent = category.icon && (Icons as Record<string, React.ElementType>)[category.icon];

      return (
        <button
          key={category._id}
          onClick={() => onSelect(category._id)}
          className={` 
            flex items-center gap-2 px-4 py-2 rounded-full 
            transition-all duration-300
            ${selectedCategory === category._id 
              ? 'bg-white text-black' 
              : 'hover:bg-white/20'
            }
          `}
          aria-pressed={selectedCategory === category._id}
        >
          {IconComponent && <IconComponent className="shrink-0" />}
          <span>{category.title}</span>
          {selectedCategory === category._id && <FaChevronDown />}
        </button>
      );
    })}
  </div>
));

CategoryButtons.displayName = 'CategoryButtons'; 
