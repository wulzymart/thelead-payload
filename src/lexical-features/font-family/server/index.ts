
import { createServerFeature } from '@payloadcms/richtext-lexical'


export const FontFamilyFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexical-features/font-family/client#FontFamilyFeatureClient',
  },
  key: 'fontFamily',
})
