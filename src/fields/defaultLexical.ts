import { Config } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { ClearFormatFeature } from '@/lexical-features/clear-format/server'
import { FontSize } from '@/lexical-features/font-size/server'
import { FontWeight } from '@/lexical-features/font-weight/server'
import { ColorFeature } from '@/lexical-features/colour/server'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({
        enabledCollections: ['categories', 'posts'],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            return !('name' in field && field.name === 'url');
          })

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: ({ linkType }) => linkType !== 'internal',
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
            },
          ]
        },
      }),
      FontSize(),
      FontWeight(),
      ColorFeature(),
      ClearFormatFeature()
    ]
  },
})
