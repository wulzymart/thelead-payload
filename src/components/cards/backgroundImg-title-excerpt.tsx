import Image from "next/image";
import Link from "next/link";
import { Category, Media, Post, Subcategory } from '@/payload-types'
import { getExcerpt, makeExcerpt } from '@/utilities/getExcerpt'

export default function BackgroundImageTitleExcerpt({
  news: { title, category, subcategories, featuredImage, isExclusive,excerpt, slug, content },
}: {
  news:Post
}) {
  return (
    <div
      className={`w-full h-[400px] md:h-full bg-black flex items-end gap-x-6 relative bg-cover ${
        !featuredImage && "bg-gray-300"
      } rounded-lg overflow-hidden shadow-md`}
      style={{}}
    >
      {featuredImage ? (
        <Image
          src={(featuredImage as unknown as Media).url || "/dark-bg.jpg"}
          alt={(featuredImage as unknown as Media).alt || title}
          fill
          style={{ objectFit: "contain" }}
          quality={10}
          priority={true}
        />
      ) : (
        ""
      )}
      <div className="w-full h-full absolute inset-0 bg-black opacity-40"></div>
      <div className="w-full mb-4 text-white relative z-50 px-6">
        {category && (
          <p className="my-0 bg-accent px-2 py-1 mb-6 uppercase font-medium w-fit">
            <Link href={`/${(category as unknown as Category).slug}`}>
              <span>{(category as unknown as Category).title}</span>
            </Link>
            {subcategories &&
              subcategories.map((subcategory) => (
                <span key={(subcategory as unknown as Subcategory).id}>
                  <span> | </span>{" "}
                  <Link href={`/${(subcategory as unknown as Subcategory).slug}/${(subcategory as unknown as Subcategory).slug}`}>
                    {(subcategory as unknown as Subcategory).title}
                  </Link>
                </span>
              ))}
          </p>
        )}
        <Link href={`/news/${slug}`}>
          <div>
            <h2 className="text-lg font-semibold my-0-800 mb-1">
              {isExclusive && (
                <span className="text-white bg-accent px-2 mr-2">
                  EXCLUSIVE
                </span>
              )}
              {title}
            </h2>
            <p className='max-sm:hidden'>{excerpt ? makeExcerpt(excerpt) : getExcerpt(content)}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
