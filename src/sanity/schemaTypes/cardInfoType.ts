import { defineType, defineField } from 'sanity'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
    name: 'cardInfo',
    title: 'Project Card',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'ID',
        type: 'number',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: {
          hotspot: true,
        }
      },
      {
        name: 'miniatures',
        title: 'Miniature Images',
        type: 'array',
        of: [{
          type: 'image',
          options: {
            hotspot: true
          }
        }]
      },
      {
        name: 'backgroundImage', // Nuevo campo
        title: 'Background Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        description: 'Optional background image for the card'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'array',
        of: [{
          type: 'block'
        }]
      },
      {
        name: 'projectDetails',
        title: 'Project Details',
        type: 'object',
        fields: [
          {
            name: 'client',
            title: 'Client',
            type: 'string'
          },
          {
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'projectType',
            title: 'Project Type',
            type: 'string'
          }
        ]
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }],
        validation: (Rule: any) => Rule.required()
      }
    ]
  }

export const cardInfoType = defineType({
  name: 'cardInfo',
  title: 'Card Information',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'number',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Project Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'logo',
      title: 'Project Logo',
      type: 'image'
    }),
    defineField({
      name: 'miniatures',
      title: 'Project Miniature Images',
      type: 'array',
      of: [{ 
        type: 'image',
        options: {
          hotspot: true
        }
      }]
    }),
    defineField({
      name: 'backgroundImage', // Nuevo campo
      title: 'Card Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Optional background image for the card'
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'projectDetails',
      title: 'Project Details',
      type: 'object',
      fields: [
        defineField({
          name: 'client',
          title: 'Client Name',
          type: 'string'
        }),
        defineField({
          name: 'technologies',
          title: 'Technologies Used',
          type: 'array',
          of: [{ type: 'string' }]
        }),
        defineField({
          name: 'projectType',
          title: 'Project Type',
          type: 'string',
          options: {
            list: [
              { title: 'Latest', value: 'latest' },
              { title: 'B2B', value: 'b2b' },
              { title: 'BC2', value: 'bc2' },
              { title: 'E-Commerce', value: 'ecommerce' }
            ]
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage' 
    }
  }
})