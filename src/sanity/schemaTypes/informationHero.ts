import { defineType } from 'sanity'

export const informationHero = defineType({
  name: 'informationHero',
  title: 'Information Hero',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main heading for the hero section.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Optional subheading under the main headline.',
    },
    {
      name: 'informationItems',
      title: 'Information Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of items with greater than icon',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: Rule => Rule.required().uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  }
                ]
              }
            ]
          }
        }
      ],
      description: 'Main description text with optional links',
      validation: (Rule) => Rule.required(),
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
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image displayed on the right side of the hero section',
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for accessibility',
        }
      ]
    },
    {
      name: 'video',
      title: 'Hero Video',
      type: 'file',
      description: 'Video to display in the video section',
      options: {
        accept: 'video/*'
      }
    },
    {
      name: 'videoSectionTitle',
      title: 'Video Section Title',
      type: 'string',
      description: 'Text displayed next to the video section',
      initialValue: 'See this video to know more about us'
    }
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'videoSectionTitle',
      media: 'image'
    }
  }
})