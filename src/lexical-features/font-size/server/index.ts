import { createServerFeature } from '@payloadcms/richtext-lexical';

export const FontSize = createServerFeature({
  feature: {
    ClientFeature: '@/lexical-features/font-size/client#FontSizeClient',
  },
  key: 'Font Size',
})
