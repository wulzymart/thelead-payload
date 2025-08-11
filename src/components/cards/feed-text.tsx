import Image from "next/image";
import Link from "next/link";
import { Media, Post } from '@/payload-types'

export default function FeedText({
  news: { title, featuredImage: imgSrc, slug, createdAt: date, isExclusive },
}: {
  news: Post;
}) {
  const postDate = date ? new Date(date) : undefined;
  return (
    <div className="w-full grid grid-cols-5 md:grid-cols-1 gap-2 items-center">
      <div className="md:hidden col-span-1 aspect-[4/3] md:w-1/3 bg-white grid place-items-center relative">
        <Image src={(imgSrc as unknown as Media).url as string}  alt={(imgSrc as unknown as Media).alt || title} className="rounded" fill />
      </div>
      <div className="w-full col-span-4 md:col-span-1">
        <Link href={`/news/${slug}`}>
          <h2 className="text-base font-semibold my-0 text-gray-800 mb-2">
            {isExclusive && (
              <span className="text-white bg-accent px-2 mr-2">EXCLUSIVE</span>
            )}
            {title}
          </h2>
        </Link>
        <p className="text-sm my-0 text-gray-700">
          {postDate
            ? `${postDate.toLocaleDateString("en-NG", {
                dateStyle: "short",
              })} ${postDate.toLocaleTimeString("en-NG", {
                hour12: true,
                timeStyle: "short",
              })}`
            : ""}
        </p>
      </div>
    </div>
  );
}
