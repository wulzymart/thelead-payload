import { createHeadlessEditor } from '@payloadcms/richtext-lexical/lexical/headless'
import {
  BoldFeature,
  defaultEditorConfig,
  getEnabledNodes, ItalicFeature, LinkFeature,
  ParagraphFeature,
  sanitizeServerEditorConfig, UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import config from '@payload-config'
import { FontSize } from '@/lexical-features/font-size/server'
import { FontWeight } from '@/lexical-features/font-weight/server'
import { ColorFeature } from '@/lexical-features/colour/server'
import { ClearFormatFeature } from '@/lexical-features/clear-format/server'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { $getRoot } from '@payloadcms/richtext-lexical/lexical'
const yourEditorConfig  = defaultEditorConfig
yourEditorConfig.features = [ParagraphFeature(),
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
  ClearFormatFeature()]
const payloadConfig = config // <= your Payload Config here


export async function getExcerpt(lexicalJson: SerializedEditorState, maxWords: number = 100) {
  const headlessEditor = createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: await sanitizeServerEditorConfig(yourEditorConfig, await payloadConfig),
    }),
  })
  try {
    headlessEditor.update(
      () => {
        headlessEditor.setEditorState(headlessEditor.parseEditorState(lexicalJson))
      },
      { discrete: true },  // This should commit the editor state immediately
    )
  } catch (e) {
    console.error({ err: e }, 'ERROR parsing editor state')
  }

// Export to plain text
  const plainTextContent =
    headlessEditor.getEditorState().read(() => {
      return $getRoot().getTextContent()
    }) || ''
  return makeExcerpt(plainTextContent, maxWords)
}
export function makeExcerpt(text: string, maxWords: number = 100): string {
  // Remove extra whitespace and split into words
  const words = text.trim().split(/\s+/);

  // If text is shorter than max words, return full text
  if (words.length <= maxWords) {
    return text;
  }

  // Slice the first maxWords
  const excerptWords = words.slice(0, maxWords);

  // Join words and append ellipsis
  return excerptWords.join(' ') + '...';
}
