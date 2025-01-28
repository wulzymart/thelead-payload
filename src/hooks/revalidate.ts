import { Category, Subcategory } from '@/payload-types'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateCategory: CollectionAfterChangeHook<Category> = ({ doc }) => {
  revalidatePath(`/${doc.slug}`)
  revalidateTag('sitemap')
  return doc
}
export const revalidateSubCategory: CollectionAfterChangeHook<Subcategory>=({ doc }) => {
  const categorySlug = (doc.category as Category)?.slug
  revalidatePath(`/${categorySlug}/${doc.slug}`)
  revalidateTag('sitemap')
  return doc
}
