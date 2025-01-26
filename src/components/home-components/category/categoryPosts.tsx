import NewsReadMoreCard from "@/components/cards/news-card-md";
import { getPayload, Where } from 'payload'
import config from '@payload-config'

export default async function CategoryPosts({ category, subcategory }: { category: string; subcategory?: string}) {
  const payload = await getPayload({ config })
  let where: Where | undefined = undefined
  if (subcategory) {
    where = {
      'subcategories.slug': {
        equals: subcategory
      },
      _status: {
        equals: 'published'
      }
    }
  }else {
    where = {
      'category.slug': {
        equals: category
      },
      _status: {
        equals: 'published'
      }
    }
  }
  const {docs: news } = await payload.find({
    collection: 'posts',
    limit: 12,
    where,
    sort: '-createdAt'
  })
  return (
      <div className="mt-8 md:mt-20 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {news?.map((post) => (
          <NewsReadMoreCard
            key={post.id}
            news={post}
          />
        ))}
      </div>
  );
}
