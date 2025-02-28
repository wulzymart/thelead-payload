import type { Metadata } from 'next'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { LatestNews } from '@/heading/latest-news'
import Subscribe from '@/components/cards/subscribe'
import ShellAdvert from '@/components/cards/shell-advert'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { Category } from '@/payload-types'
import { notFound } from 'next/navigation'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from '@/components/react-share'
import { getServerSideURL } from '@/utilities/getURL'
import { FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from 'react-share'
import { LinkedinIcon } from 'lucide-react'

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

  return posts.docs.map(({ slug }) => {
    return { slug }
  })
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function PostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/news/' + slug
  const shareURL = getServerSideURL() + url
  console.log(shareURL)

  const news = await queryPostBySlug({ slug })
  if (!news) throw notFound()
  const payload = await getPayload({ config: configPromise })
  const { docs: relatedPosts } = await payload.find({
    collection: 'posts',
    limit: 6,
    where: {
      _status: {
        equals: 'published',
      },
      slug: {
        not_equals: slug,
      },
      'category.slug': {
        equals: (news.category as Category).slug,
      },
    },
    overrideAccess: false,
    pagination: false,
    select: {
      title: true,
      slug: true,
      featuredImage: true,
    },
  })
  const tag = (news.category as unknown as Category).slug!
  const generateHashtags = () => {
    const tags: string[] = [tag]
    news.subcategories?.map((sub) => {
      if (typeof sub === 'string') return
      tags.push(sub.slug!)
    })
    return tags
  }
  return (
    <div className="w-[90%] mx-auto mt-8 grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <main className="md:col-span-2 lg:col-span-3">
        <article>
          <PageClient />
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
              <MediaBlock
                media={news.featuredImage}
                enableCaption={news.enableCaption!}
                blockType="mediaBlock"
              />
            </div>
          ) : (
            ''
          )}
          <section id="content" className="mt-6">
            <div className="mx-auto flex justify-end my-4 gap-4 w-[95%]">
              <TwitterShareButton url={shareURL} title={news.title} hashtags={generateHashtags()}>
                <TwitterIcon size={20} />
              </TwitterShareButton>
              <FacebookShareButton url={shareURL} title={news.title} hashtag={tag}>
                <FacebookIcon size={20} />
              </FacebookShareButton>
              <LinkedinShareButton url={shareURL} title={news.title}>
                <LinkedinIcon className="bg-blue-300 p-0.5" size={20} />
              </LinkedinShareButton>
              <WhatsappShareButton url={shareURL} title={news.title} separator="\n">
                <WhatsappIcon size={20} />
              </WhatsappShareButton>
              <TelegramShareButton url={shareURL} title={news.title}>
                <TelegramIcon size={20} />
              </TelegramShareButton>
            </div>
            <RichText className="w-full text-lg" data={news.content} enableGutter={false} />
            {((news.relatedPosts && news.relatedPosts.length > 0) || relatedPosts.length > 0) && (
              <div className="mt-8">
                <h4 className="text-lg font-medium">Related News</h4>
                <RelatedPosts
                  className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                  docs={
                    news.relatedPosts?.filter((news) => typeof news === 'object') ||
                    (relatedPosts as any)
                  }
                />
              </div>
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

  return generateMeta({ doc: post, url: '/news/' + slug })
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
