// // src/components/services/ServiceCard.tsx
// "use client";

// import { useState } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import imageUrlBuilder from '@sanity/image-url';
// import { client } from '@/sanity/lib/client';

// const builder = imageUrlBuilder(client);

// function urlFor(source: any) {
//   return builder.image(source);
// }

// interface ServiceCardProps {
//   service: {
//     icon: any;
//     title: string;
//     description: string;
//     image: any;
//   };
// }

// export const ServiceCard = ({ service }: ServiceCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div 
//       className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 relative overflow-hidden shadow-lg hover:bg-white/20 hover:shadow-2xl"
//       animate={{ width: isHovered ? "130%" : "100%" }}
//       transition={{ duration: 0.3 }}
//     >
//       <div 
//         className="relative w-full max-w-xl"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="flex items-center space-x-4 sm:space-x-6 mb-4 sm:mb-6 md:mb-8">
//           <div className="bg-white/20 p-2 sm:p-3 rounded-full relative w-12 h-12 sm:w-16 sm:h-16">
//             <Image 
//               src={urlFor(service.icon).url()}
//               alt={service.title} 
//               layout="fill"
//               objectFit="contain"
//               className="rounded-full group-hover:scale-110 transition-transform"
//             />
//           </div>
//           <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//             {service.title}
//           </h3>
//         </div>
        
//         <p className="text-white/90 group-hover:text-white text-sm sm:text-base md:text-lg leading-relaxed">
//           {service.description}
//         </p>
//       </div>

//       <motion.div 
//         className="absolute z-10 height-0 -top-24 bottom-0 w-1/3 opacity-0 transition-opacity duration-300"
//         style={{ right: '10%' }}
//         initial={{ x: "100%", opacity: 0 }}
//         animate={{ x: isHovered ? 0 : "", opacity: isHovered ? 1 : 0 }}
//         transition={{ type: "spring", stiffness: 100, damping: 20 }}
//       >
//         <Image 
//           src={urlFor(service.image).url()}
//           alt={`${service.title} image`}
//           layout="fill"
//           objectFit="contain"
//           className='bg-white/10 rounded-lg shadow-lg'
//         />
//       </motion.div>
//     </motion.div>
//   );
// };