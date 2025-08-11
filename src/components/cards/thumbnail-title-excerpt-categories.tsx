import { Category, Subcategory } from "@/namespaces/models/category";
import Image from "next/image";
import Link from "next/link";
import { Media, Post } from '@/payload-types'
import { getExcerpt, makeExcerpt } from '@/utilities/getExcerpt'

export default function NewsThumbnailTitleExcerptCategoriesCard({
  news: {
    title,
    content,
    category,
    excerpt,
    subcategories,
    featuredImage: imgSrc,
    createdAt: date,}
}: {
  news: Post
}) {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 bg-white grid place-items-center">
          <Image
            src={(imgSrc as Media).url!}
            alt={(imgSrc as unknown as Media).alt || title}
            className="rounded-xl"
            fill
            style={{ objectFit: "contain" }}
            quality={30}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        </div>
        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          {category && (
            <div className="flex justify-between item-center">
              <Link href={`/${(category as unknown as Category).slug}`}>
                <div className="bg-accent px-3 py-1 rounded-full text-xs font-medium text-white">
                  {(category as unknown as Category).name}
                </div>
              </Link>
              {subcategories &&
                subcategories.map((subcategory) => (
                  <Link
                    key={(subcategory as unknown as Subcategory).id}
                    href={`/${(subcategory as unknown as Subcategory).slug}/${(subcategory as unknown as Subcategory).slug}`}
                  >
                    <div className="bg-accent px-3 py-1 rounded-full text-xs font-medium text-white">
                      {(subcategory as unknown as Subcategory).name}
                    </div>
                  </Link>
                ))}
            </div>
          )}
          <h3 className="font-black text-accent md:text-3xl text-xl">
            {title}
          </h3>
          <p className="md:text-lg text-gray-500 text-base">
            {excerpt ? makeExcerpt(excerpt) : getExcerpt(content)}
          </p>
          <p className="text-base text-gray-600">
            {date && new Date(date).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
