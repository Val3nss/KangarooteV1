
export const CmsplatformtType  = {
    name: 'cmsPlatforms',
    title: 'CMS Platforms',
    type: 'document',
    fields: [
      {
        name: 'superheading',
        title: 'Super Heading',
        type: 'string'
      },
      {
        name: 'headline',
        title: 'Headline',
        type: 'string'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'blockContent'
      },
      {
        name: 'featuredImage',
        title: 'Featured Image',
        type: 'image'
      },
      {
        name: 'platformCards',
        title: 'Platform Cards',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'image'
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url'
            },
            {
              name: 'linkText',
              title: 'Link Text',
              type: 'string'
            },
            {
              name: 'lineColor',
              title: 'Line Color',
              type: 'string'
            },
            {
              name: 'hoverClass',
              title: 'Hover Class',
              type: 'string'
            }
          ]
        }]
      }
    ]
  }