import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Media, Post } from '@/payload-types'
//
// import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { LatestNews } from '@/heading/latest-news'
import Subscribe from '@/components/cards/subscribe'
import ShellAdvert from '@/components/cards/shell-advert'
import Image from 'next/image'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { getExcerpt } from '@/utilities/getExcerpt'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const news = await queryPostBySlug({ slug })

  if (!news) return <PayloadRedirects url={url} />
  getExcerpt(news.content)
  return (
    <div className="w-[90%] mx-auto mt-8 grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <main className="md:col-span-2 lg:col-span-3">
        <article>
          <PageClient />

          {/* Allows redirects for valid pages too */}
          <PayloadRedirects disableNotFound url={url} />

          {draft && <LivePreviewListener />}
          <h1 className="text-xl md:text-2xl font-serif font-bold md:font-extrabold">
            {news.title}
          </h1>
          <p className="text-sm text-gray-800">{new Date(news.createdAt).toDateString()}</p>
          {news.featuredImage ? (
            <div
              className="mt-4"
              style={{
                width: '100%',
                aspectRatio: '5/3',
                position: 'relative',
              }}
            >
              <MediaBlock media={news.featuredImage} blockType='mediaBlock'/>
            </div>
          ) : (
            ''
          )}
          <section id="content" className="mt-6">
            <RichText className="w-full text-lg" data={news.content} enableGutter={false} />
            {news.relatedPosts && news.relatedPosts.length > 0 && (
              <RelatedPosts
                className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                docs={news.relatedPosts.filter((news) => typeof news === 'object')}
              />
            )}
          </section>
        </article>
      </main>
      <aside className="col-span-1 flex flex-col gap-8">
        <LatestNews />
        <Subscribe />
        <ShellAdvert />
      </aside>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
