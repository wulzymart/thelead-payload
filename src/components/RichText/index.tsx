import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState, SerializedTextNode } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { createElement, JSX } from 'react'
import { TEXT_TYPE_TO_FORMAT } from '@/utilities/richtext-serializer'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>
const  camelize = (s: string) => s.replace(/-./g, x=>x[1]!.toUpperCase())
const stylesConverter = (styles: string) => {
  const stylesArray =styles.split(';').filter(style => !!style).map(style => style.split(':'))
  return stylesArray.reduce((acc, [key, value]) => {
    // @ts-ignore
    acc[camelize(key)] = value
    return acc
  }, {})
}
type TextElementType = 'span' | 'em' | 'strong' | 'code' | 'sub' | 'sup'
const  textNodeFormatter : (arg:{ node: SerializedTextNode}) => JSX.Element =  ({ node: { text, style: nodeStyle, format,  ...node } }) =>  {
  const defaultStyle = {
    textDecoration: format === TEXT_TYPE_TO_FORMAT.strikethrough ? 'line-through' :  format === TEXT_TYPE_TO_FORMAT.underline ? 'underline' : undefined
  }
  const style = nodeStyle ?  stylesConverter(nodeStyle) : {}
  const element: TextElementType = format === TEXT_TYPE_TO_FORMAT.bold ? 'strong' : format === TEXT_TYPE_TO_FORMAT.italic? 'em' : format === TEXT_TYPE_TO_FORMAT.code ? 'code' : format === TEXT_TYPE_TO_FORMAT.subscript ? 'sub' : format === TEXT_TYPE_TO_FORMAT.superscript ? 'sup' : 'span'
  return  createElement(element, { style: { ...defaultStyle, ...style } }, text)
}

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  text: textNodeFormatter,
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
