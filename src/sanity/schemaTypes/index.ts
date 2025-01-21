import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { authorType } from './authorType'
import { cardInfoType } from './cardInfoType'
import { informationHero } from './informationHero'
import { ServiceHero } from './ServiceType'
import { CmsplatformtType } from './CmsPlatformtType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, 
    authorType, 
    cardInfoType, 
    informationHero, 
    ServiceHero,
    CmsplatformtType,
  ],
}