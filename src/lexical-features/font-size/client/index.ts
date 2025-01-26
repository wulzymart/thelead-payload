'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { toolbarGroups } from '@/lexical-features/font-size/client/toolbar'

export const FontSizeClient = createClientFeature({
  toolbarFixed: {
    groups: [toolbarGroups]
  },
  toolbarInline: {
    groups: [toolbarGroups]
  }
})