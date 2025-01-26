'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { toolbarGroups } from '@/lexical-features/font-weight/client/toolbar'

export const FontWeightClient = createClientFeature({
  toolbarFixed: {
    groups: [toolbarGroups]
  },
  toolbarInline: {
    groups: [toolbarGroups]
  }
})