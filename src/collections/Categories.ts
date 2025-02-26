import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { isAdmin } from '@/access/isAdmin'
import { revalidateCategory } from '@/hooks/revalidate'
export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    admin: (args) => isSuperAdmin(args) || isAdmin(args),
    create: (args) => isSuperAdmin(args) || isAdmin(args),
    delete: (args) => isSuperAdmin(args) || isAdmin(args),
    read: anyone,
    update: (args) => isSuperAdmin(args) || isAdmin(args),
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidateCategory],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    { name: 'subcategories', type: 'join', collection: 'subcategories', on: 'category' },
    { name: 'news', type: 'join', collection: 'posts', on: 'category' },
    {
      name: 'parent',
      admin: { hidden: true },
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      required: false,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
  ],
}
