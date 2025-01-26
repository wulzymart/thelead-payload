import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, Where } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Category, Subcategory } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
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

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })
//
//
// }

type Args = {
  params: Promise<{
    slug: string[]
  }>
  searchParams: { page?: string }
}

export default async function Page({ params: paramsPromise , searchParams: { page: currentPage }}: Args, ) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise

  if (slug.length > 2) {
    throw notFound()
  }
  const [categorySlug, subcategorySlug] = slug
  const payload = await getPayload({ config: configPromise })

  const select: any = {
    title: true,
    slug: true,
    subcategories: {
      title: true,
      slug: true,
    },
  }

  const {
    totalDocs,
    docs: [category],
  } = await payload.find({
    collection: 'categories',
    overrideAccess: false,
    where: {
      slug: {
        equals: categorySlug,
      },
    },
    select,
  })
  if (!totalDocs) throw notFound()

  const subcategorySearch = subcategorySlug
    ? await payload.find({
        collection: 'subcategories',
        where: {
          slug: {
            equals: subcategorySlug,
          },
          'category.slug': {
            equals: categorySlug,
          },
        },
        overrideAccess: false,
        select: {
          title: true,
          slug: true,
        },
      })
    : undefined

  if (subcategorySlug && subcategorySearch) {
    if (!subcategorySearch.totalDocs) throw notFound()
  }
  const subcategory = subcategorySlug && subcategorySearch ? subcategorySearch.docs[0] : undefined

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
    totalDocs: totalPosts,
    totalPages,
    nextPage,
    prevPage,
    hasNextPage,
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


// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//   const { slug = 'home' } = await paramsPromise
//   const page = await queryPageBySlug({
//     slug,
//   })
//
//   return generateMeta({ doc: page })
// }
//
