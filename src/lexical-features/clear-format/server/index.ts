import { createServerFeature } from '@payloadcms/richtext-lexical'
import { ClearFormatClient } from '@/lexical-features/clear-format/client'

export const ClearFormatFeature = createServerFeature({
  key: 'clearFormat',
  feature: {
    ClientFeature: '@/lexical-features/clear-format/client#ClearFormatClient',
  }
})
