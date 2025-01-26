'use client'
import {
  createClientFeature,
} from '@payloadcms/richtext-lexical/client'

import { FontColourDD } from '@/lexical-features/colour/font-colour'
import { BgColourDD } from '@/lexical-features/colour/bg-colour'
import { toolbarAddDropdownGroupWithItems } from '@/lexical-features/colour/toolbar'


export const ColorFeatureClient = createClientFeature({
  toolbarInline: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          key: 'fontColor',
          label: 'Font Color',
          Component: FontColourDD,
          order: 1,
        },
        {
          key: 'bgColor',
          label: 'Background Color',
          Component: BgColourDD,
          order: 1,
        },
      ]),
    ],
  },
  toolbarFixed: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          key: 'fontColor',
          label: 'Font Color',
          Component: FontColourDD,
          order: 1,
        },
        {
          key: 'bgColor',
          label: 'Background Color',
          Component: BgColourDD,
          order: 1,
        },
      ]),
    ],
  }
})

