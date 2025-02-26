import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export const revalidate = 3600 * 24

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://theleadng.com'

  const { docs: categories } = await payload.find({
    collection: 'categories',
    overrideAccess: false,
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
      updatedAt: true,
      subcategories: true,
    },
  })

  const dateFallback = new Date().toISOString()

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: dateFallback,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: dateFallback,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: dateFallback,
    },
  ]
  const { docs: news } = await payload.find({
    collection: 'posts',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  categories
    .filter((page) => Boolean(page?.slug))
    .forEach(({ slug, updatedAt, subcategories }) => {
      sitemap.push({
        url: `${SITE_URL}/${slug}`,
        lastModified: updatedAt || dateFallback,
      })
      subcategories?.docs?.forEach((subcategory) => {
        if (typeof subcategory === 'string') return
        sitemap.push({
          url: `${SITE_URL}/${slug}/${subcategory.slug}`,
          lastModified: subcategory.updatedAt || dateFallback,
        })
      })
    })
  news.forEach(({ slug, updatedAt }) => {
    sitemap.push({
      url: `${SITE_URL}/news/${slug}`,
      lastModified: updatedAt || dateFallback,
    })
  })

  return sitemap
}
