import { defineType } from 'sanity'

export const ServiceHero = defineType({
  name: 'serviceHero',
  title: 'Service Hero',
  type: 'document',
  fields: [
    {
      name: 'superheading',
      title: 'Superheading',
      type: 'string',
      description: 'Optional superheading above the main headline.',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main heading for the hero section.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Main description text with optional links',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image displayed in the left section',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'informationItems',
      title: 'Information Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of items with greater than icon',
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              })
            }
          ]
        }
      ],
      description: 'Links to display in the hero section',
    },
    {
      name: 'serviceCards',
      title: 'Service Cards',
      type: 'array',
      of: [{
        type: 'object',
        name: 'serviceCard',
        title: 'Service Card',
        fields: [
          {
            name: 'icon',
            title: 'Icon',
            type: 'image',
            description: 'Icon for the service card',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Title of the service',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Description of the service',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'image',
            title: 'Hover Image',
            type: 'image',
            description: 'Image that appears when hovering over the card',
            validation: (Rule) => Rule.required(),
          }
        ]
      }],
      description: 'Service cards to display in the right section',
      validation: (Rule) => Rule.required().min(1),
    }
  ]
})