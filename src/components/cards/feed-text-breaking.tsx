import Link from "next/link";
import { Post } from '@/payload-types'

export default function FeedText({
  news: {title, isExclusive, createdAt: date, slug, },
}: {
  news: Post
}) {
  const postDate = date ? new Date(date) : undefined;
  return (
    <div className="w-full">
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
  );
}
