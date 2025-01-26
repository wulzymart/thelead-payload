import { createServerFeature } from '@payloadcms/richtext-lexical';

export const FontWeight = createServerFeature({
  feature: {
    ClientFeature: '@/lexical-features/font-weight/client#FontWeightClient',
  },
  key: 'Font Weight',
})
