import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Kangaroo Content')
    .items([
      // Agregar documentos principales
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('cardInfo').title('Información de Tarjetas'),
      S.documentTypeListItem('informationHero').title('Information Hero'), 
      S.documentTypeListItem('serviceHero').title('Service Hero'), // Solo dejamos la versión en minúsculas
      S.documentTypeListItem('cmsPlatforms').title('CMS Platforms'), 
      S.divider(),

      // Filtrar y agregar otros documentos automáticamente
      ...S.documentTypeListItems().filter(
        (item) => {
          const id = item.getId();
          return id && !['author', 'cardInfo', 'informationHero', 'serviceHero', 'cmsPlatforms'].includes(id); // Solo incluimos la versión en minúsculas
        }
      ),
    ]);