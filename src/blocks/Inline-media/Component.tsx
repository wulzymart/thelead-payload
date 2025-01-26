import type { StaticImageData } from 'next/image'

import { cn } from 'src/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { InlineMediaBlock as InlineMediaBlockProps, Media as MediaProp } from '@/payload-types'
import { Media } from '@/components/Media'


type Props = {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean,
  width?: number | null
  height?: number | null
  media: MediaProp | string
}

export const SingleMediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    width, height
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption
const style = {} as any
 if (height )style.height = height
  if (width )style.width = width
  return (
    <div
      style={style}
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      <Media
        imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
        resource={media}
        src={staticImage}
      />
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
export const InlineMediaBlock: React.FC<InlineMediaBlockProps> = (props: InlineMediaBlockProps & {captionClassName?: string}) => {
  const {
   alignment,
    media,
    gap,
    enableCaptions
  } = props
  const gutter = false
  console.log(gap)

  return (
  <div className={cn('container flex flex-wrap items',`gap-[${gap?.toString()}px]`, `justify-${alignment === 'left' ? 'start' : alignment === 'right' ? 'end' : 'center'}` )}>
    {media.map((item, i) => {
      return <SingleMediaBlock key={i} {...item } captionClassName={cn(`${!enableCaptions? 'hidden': "max-w-[48rem]"}`, `justify-${alignment === 'left' ? 'start' : alignment === 'right' ? 'end' : 'center'}`)}
                               enableGutter={false}
                               disableInnerContainer={true}/>
    })}
  </div>
  )
}
