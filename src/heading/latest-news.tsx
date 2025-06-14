import { Post } from '@/payload-types'
import FeedText from '@/components/cards/feed-text'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function LatestNews({
  news
}: {
  news?: Post[]
}) {
  const payload = await getPayload({ config })
  if (!news) news = (await payload.find({
    collection: 'posts',
    limit: 6,
    overrideAccess: false,
  })).docs as Post[]
  return (
    <div className="space-y-4 w-full">
          <h2>Latest News</h2>
          {news.slice(0, 6).map((post) => (
            <FeedText
              key={post.id}
              news={post}
            />
          ))}
    </div>
  );
}
