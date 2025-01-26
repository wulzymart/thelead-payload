
import { createServerFeature } from '@payloadcms/richtext-lexical'


export const ColorFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexical-features/colour/client#ColorFeatureClient',
  },
  key: 'color',
})
