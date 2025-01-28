import Image from "next/image";
import Link from "next/link";
import { Media, Post } from '@/payload-types'
import { getExcerpt, makeExcerpt } from '@/utilities/getExcerpt'

export default function NewsThumbnailTitleExcerptCard({
  news: { title, excerpt, featuredImage: imgSrc, slug, content },
  className,
}: {
  news: Post
  className?: string
}) {
  return (
    <div className={`py-6 ${className}`}>
      <Link href={`/news/${slug}`}>
        <div className="flex flex-col xl:flex-row w-full bg-white shadow-lg rounded-lg overflow-hidden min-h-full">
          <div className="max-lg:w-full md:h-[300px] xl:min-h-[300px] xl:w-1/3 bg-accent-foreground relative">
            <Image
              src={(imgSrc as Media).thumbnailURL || "/dark-bg.jpg"}
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
          <div className="w-full md:w-2/3 p-4">
            <h1 className="text-accent font-bold text-2xl">{title}</h1>
            <p className="mt-2 text-gray-600">{excerpt ? makeExcerpt(excerpt) : getExcerpt(content)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
