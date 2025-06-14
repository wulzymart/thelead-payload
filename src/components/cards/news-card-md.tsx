import Image from "next/image";
import Link from "next/link";
import { Category, Media, Post, Subcategory } from '@/payload-types'

export default function NewsReadMoreCard({
  news,
}: {
  news: Post
}) {
  const { title, category, subcategories, slug, featuredImage: imgSrc, isExclusive } = news
  return (

      <div className="w-full items-center h-fit">
        <div
          style={{ width: "100%", aspectRatio: "5/3", position: "relative" }}
          className="bg-[#0f172a]"
        >
          <Image
            className="w-full aspect-[4/3] object-contain"
            src={(imgSrc as Media)?.thumbnailURL || "/dark-bg.jpg"}
            alt={(imgSrc as unknown as Media).alt || title}
            fill
            style={{ objectFit: "contain" }}
            quality={10}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </div>

        <div className="w-full">
          {category && (
            <p className="my-0 bg-accent text-white px-2 py-1 mb-6 uppercase font-medium w-fit">
              <Link href={`/${(category as unknown as Category).slug}`}>
                <span>{(category as unknown as Category).title}</span>
              </Link>
              {subcategories &&
                subcategories.map((subcategory) => (
                  <span key={(subcategory as unknown as Subcategory).id}>
                    <span> | </span>{" "}
                    <Link href={`/${(category as unknown as Category).slug}/${(subcategory as unknown as Subcategory).slug}`}>
                      {(subcategory as unknown as Subcategory).title}
                    </Link>
                  </span>
                ))}
            </p>
          )}
          <h2 className="text-base font-semibold my-0 text-gray-800 mb-1">
            {isExclusive && (
              <span className="text-white bg-accent px-2 mr-2">EXCLUSIVE</span>
            )}
            <Link href={`/news/${slug}`}>
            {title}
            </Link>
          </h2>
        </div>
      </div>
  );
}
