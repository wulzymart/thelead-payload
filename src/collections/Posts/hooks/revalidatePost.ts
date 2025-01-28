import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Category, Post} from '@/payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      revalidate(doc)
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/news/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidate(doc)
  }

  return doc
}
function revalidate(doc: Post){
  revalidateTag('/')
  const categorySlug = (doc?.category as Category).slug!
  revalidatePath(`/news/${categorySlug}`)
  revalidatePath(`/news`)
  doc?.subcategories?.forEach((subcategory) => {
    if (typeof subcategory === 'string') return
    revalidatePath(`/${categorySlug}/${subcategory.slug}`)
  })
  revalidateTag('sitemap')
}
