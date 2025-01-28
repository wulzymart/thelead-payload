import { cn } from '@/utilities/ui'
import React from 'react'

import type { Post } from '@/payload-types'
import NewsReadMoreCard from '@/components/cards/news-card-md'

export type Props = {
  posts: Post[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            console.log(result)
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <NewsReadMoreCard news={result} key={index} />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
