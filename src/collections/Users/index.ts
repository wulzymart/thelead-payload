import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { isAdmin } from '@/access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: (args) => isSuperAdmin(args) || isAdmin(args),
    delete: (args) => isSuperAdmin(args) || isAdmin(args),
    read: authenticated,
    update: (args) => isSuperAdmin(args) || isAdmin(args),
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Author',
          value: 'author',
        },
      ],
      defaultValue: 'author',
    },
  ],
  timestamps: true,
}
