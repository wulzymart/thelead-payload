import { createServerFeature } from '@payloadcms/richtext-lexical'

export const ClearFormatFeature = createServerFeature({
  key: 'clearFormat',
  feature: {
    ClientFeature: '@/lexical-features/clear-format/client#ClearFormatClient',
  }
})
