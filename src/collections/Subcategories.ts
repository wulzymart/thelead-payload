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
import { revalidateSubCategory } from '@/hooks/revalidate'

export const Subcategories: CollectionConfig = {
  slug: 'subcategories',
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
    afterChange: [revalidateSubCategory],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {name: 'category', type: 'relationship', relationTo: 'categories', required: true, hasMany: false},
    {name: 'news', type: 'join', collection: 'posts', on: 'subcategories'},
    {type: 'tabs', tabs: [
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
        }
      ]},
    ...slugField('title'),
  ],
}
