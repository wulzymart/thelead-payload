import { cn } from 'src/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { VideoEmbedBlock as VideoEmbedProps } from '@/payload-types'
import ReactPlayer from '@/components/react-player/react-player'



type Props = VideoEmbedProps & {
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  disableInnerContainer?: boolean
}

export const VideoEmbedBlock: React.FC<Props> = (props) => {
  const {
    disableInnerContainer,
    captionClassName,
    className,
    enableGutter = true,
    url,
    caption,
  } = props
  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
    <ReactPlayer url={url} />
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
