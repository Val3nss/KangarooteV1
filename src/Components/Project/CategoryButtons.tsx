import React from 'react';
import * as Icons from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { Category } from '@/Components/types/project';

interface CategoryButtonsProps {
  categories: Category[];
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
      const IconComponent = category.icon ? (Icons as any)[category.icon] : null;
      
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