// import Image from 'next/image';

// const cardData = [
//   {
//     id: 1,
//     imageUrl: 'https://www.digitalsilk.com/wp-content/uploads/2024/09/NW.png',
//     logoUrl: '/Kangaroote-01.png',
//     altText: 'Creative Digital Agency',
//   },
//   {
//     id: 2,
//     imageUrl: 'https://www.digitalsilk.com/wp-content/uploads/2024/09/NW.png',
//     logoUrl: '/Kangaroote-01.png',
//     altText: 'Creative Digital Agency',
//   },
//   {
//     id: 3,
//     imageUrl: 'https://www.digitalsilk.com/wp-content/uploads/2024/09/NW.png',
//     logoUrl: '/Kangaroote-01.png',
//     altText: 'Creative Digital Agency',
//   },
//   {
//     id: 4,
//     imageUrl: 'https://www.digitalsilk.com/wp-content/uploads/2024/09/NW.png',
//     logoUrl: '/Kangaroote-01.png',
//     altText: 'Creative Digital Agency',
//   },
// ];

// const Card = () => {
//   return (
//     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 gap-4 p-4">
//       {cardData.map((card) => (
//         <div key={card.id} className="relative w-full h-full">
//           {/* Fondo de la imagen */}
//           <div
//             className="w-full h-[500px] bg-cover bg-center relative"
//             style={{ backgroundImage: `url(${card.imageUrl})` }}
//           >
//             {/* Logo dentro del fondo, alineado a la parte inferior izquierda */}
//             <div className="absolute bottom-4 left-4">
//               <Image
//                 src={card.logoUrl}
//                 alt={card.altText}
//                 width={300}
//                 height={300}
//                 loading="lazy"
//               />
//             </div>

//             {/* Botón centrado en el fondo */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//                 View Projects
//               </button>
//             </div>
//           </div>

//           {/* Contenido adicional de la tarjeta */}
//           <div className="absolute bottom-0 p-4 w-full bg-black bg-opacity-50 text-white">
//             {/* Puedes añadir más contenido aquí si lo deseas */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Card;
