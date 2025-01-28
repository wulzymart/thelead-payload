import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload, Where } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Category, Subcategory } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Heading } from '@/heading/heading'
import NewsThumbnailTitleExcerptCard from '@/components/cards/thumdnail-title-card'
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import Subscribe from '@/components/cards/subscribe'
import ShellAdvert from '@/components/cards/shell-advert'

type Args = {
  params: Promise<{
    slug: string[]
  }>
  searchParams: Promise<{ page?: string }>
}

export default async function Page({ params: paramsPromise , searchParams: searchPromise}: Args, ) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const {page: currentPage} = await searchPromise

  if (slug.length > 2) {
    throw notFound()
  }
  const [categorySlug, subcategorySlug] = slug
  const payload = await getPayload({ config: configPromise })

  const category: Category | null = await queryCategoryBySlug({ slug: categorySlug! })
  if (!category) throw notFound()

  const subcategory: Subcategory | null = subcategorySlug? await querySubCategoryBySlug({ slug: subcategorySlug! }) : null

  if (subcategorySlug && !subcategory) throw notFound()

  const postWhere: Where = {
    _status: {
      equals: 'published',
    },
  }
  if (subcategorySlug) {
    postWhere['subcategories.slug'] = {
      equals: subcategorySlug,
    }
  } else if (categorySlug) {
    postWhere['category.slug'] = {
      equals: categorySlug,
    }
  }
  const pageUrl = `/${categorySlug}${
    subcategorySlug ? `/${subcategorySlug}` : ""
  }`;
  const {
    docs: posts,
    totalPages,
    page
  } = await payload.find({
    collection: 'posts',
    overrideAccess: false,
    where: postWhere,
    limit: 10,
    page: Number(currentPage) || 1,
  })
  return (
    <main>
      <PageClient />
      {/* Allows redirects for valid pages too */}

      {draft && <LivePreviewListener />}

      <div className="flex gap-10 text-white font-serif w-[90%] mx-auto my-10 bg-black">
        <h2 className="font-bold text-xl">{subcategory ? subcategory.title : category?.title}</h2>
        <div className="flex gap-4 text-lg font-medium">
          {!subcategory &&
            category?.subcategories?.docs?.map((subcategory) => (
              <Link
                key={(subcategory as Subcategory).id}
                className="hover:text-accent"
                href={`/${category.slug}/${(subcategory as Subcategory).slug}`}
              >
                {(subcategory as Subcategory).title}
              </Link>
            ))}
        </div>
      </div>
      <Heading category={categorySlug} subcategory={subcategorySlug} />
      <hr className="mt-16 border-accent" />
      <div className="w-[90%] mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="md:col-span-2 lg:col-span-3">
          <section className="">
            {posts.map((post) => (
              <NewsThumbnailTitleExcerptCard
                className="w-full min-h-[300px]"
                key={post.id}
                news={post}
              />
            ))}
          </section>
          <div className="mt-10">
            {page &&
              <Pagination>
                <PaginationContent>
                  {page && page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href={`${pageUrl}?page=${page - 1}`} />
                    </PaginationItem>
                  )}
                  {page && page > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink href={`${pageUrl}?page=${1}`}>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    </>
                  )}
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationLink href={`${pageUrl}?page=${page - 1}`}>
                        {page - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink href={`${pageUrl}?page=${page}`} isActive>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationLink href={`${pageUrl}?page=${page + 1}`}>
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {page < totalPages - 2 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href={`${pageUrl}?page=${totalPages}`}>
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={`${pageUrl}?page=${page + 1}`} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            }
          </div>
        </div>
        <aside className="col-span-1 flex flex-col gap-8">
          <Subscribe />
          <ShellAdvert />
        </aside>
      </div>
    </main>
  )
}


export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  if (slug.length > 2) {
    throw notFound()
  }
  const [categorySlug, subcategorySlug] = slug

  const category: Category | null = await queryCategoryBySlug({ slug: categorySlug! })
  if (!category) throw notFound()

  const subcategory: Subcategory | null = subcategorySlug? await querySubCategoryBySlug({ slug: subcategorySlug! }) : null

  if (subcategorySlug && !subcategory) throw notFound()
const url = `/${categorySlug}${subcategorySlug ? `/${subcategorySlug}` : ""}`
  return generateMeta({ doc: subcategory || category, url })
}

const queryCategoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })
  const {docs, totalDocs} = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      title: true,
      slug: true,
      subcategories: true,
      meta: true
    },
  })
  return totalDocs ? docs[0] as Category: null
})
const querySubCategoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })
  const {docs, totalDocs} =  await payload.find({
    collection: 'subcategories',
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      title: true,
      slug: true,
      meta: true
    },
  })
  return totalDocs ? docs[0] as Subcategory: null
})
