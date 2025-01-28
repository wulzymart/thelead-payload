import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Media, Post } from '@/payload-types'
// import { getExcerpt, makeExcerpt } from '@/utilities/getExcerpt'

export default function PostCardBig({
  news: { slug, featuredImage:imgSrc, title,
    // excerpt, content
  },
}: {
  news: Post
}) {
  return (
    <div className="h-[400px] md:h-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden">
      <Link href={`/news/${slug}`}>
        <div
          style={{
            width: "100%",
            aspectRatio: "4/2",
            position: "relative",
          }}
          className="bg-gray-900"
        >
          <Image
            src={(imgSrc as Media).thumbnailURL || "/dark-bg.jpg"}
            alt={(imgSrc as unknown as Media).alt || title}
            fill
            style={{ objectFit: "contain" }}
            quality={10}
            priority={true}
          />
        </div>

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-accent dark:text-white">
            {title}
          </h5>
          {/*<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">*/}
          {/*  {excerpt ? makeExcerpt(excerpt, 50) : getExcerpt(content, 50)}*/}
          {/*</p>*/}
        </div>
      </Link>
    </div>
  );
}
