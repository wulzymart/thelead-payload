import type { Block } from 'payload'

export const InlineMediaBlock: Block = {
  slug: 'inlineMediaBlock',
  interfaceName: 'InlineMediaBlock',
  fields: [
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'height',
          type: 'number',
          label: 'Height(px)',
        },
        {
          name: 'width',
          type: 'number',
          label: 'Width(px)',
        },
      ],
      required: true
    },
    {name: 'alignment', type: 'select', options: ['left', 'center', 'right'], defaultValue: 'left'},
    {name: 'gap', type: 'number', label: 'Gap(px)', defaultValue: 20},
    {name: 'enableCaptions', label: 'Enable Captions', type: 'checkbox', defaultValue: false},
  ],
}
