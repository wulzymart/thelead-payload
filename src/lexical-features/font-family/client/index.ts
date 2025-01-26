'use client'
import {
  createClientFeature, toolbarFormatGroupWithItems,
} from '@payloadcms/richtext-lexical/client'

import { FontFamilyDropDown } from '@/lexical-features/font-family/client/component'


export const FontFamilyFeatureClient = createClientFeature({
  toolbarInline: {
    groups: [
      toolbarFormatGroupWithItems([
        {
          key: 'fontFamily',
          label: 'Font Family',
          Component: FontFamilyDropDown,
          order: 1,
        }
      ]),
    ],
  },
  toolbarFixed: {
    groups: [
      toolbarFormatGroupWithItems([
        {
          key: 'fontFamily',
          label: 'Font Family',
          Component: FontFamilyDropDown,
          order: 1,
        }
      ]),
    ],
  },
})

