export interface Category {
    _id: string;
    title: string;
    icon: string;
    projectType: string;
  }
  
  export interface ProjectCard {
    id: number;
    title: string;
    imageUrl?: string; 
    backgroundImage?: {
      asset: {
        url: string;
      }
    };
    altText?: string;
    logo?: {
      asset: {
        url: string;
      }
    };
    projectDetails?: {
      projectType: string;
    };
  }