import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const VideoEmbedBlock: Block = {
  slug: 'videoEmbedBlock',
  interfaceName: 'VideoEmbedBlock',
  fields: [
    {
      name: 'url',
      label: 'Enter video URL (e.g. https://www.youtube.com/watch?v=9bZkp7q19f0 or https://youtu.be/9bZkp7q19f0)',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      label: 'Video Caption',
      type: 'richText',
      required: false,
      editor: defaultLexical
    },
  ],
}
