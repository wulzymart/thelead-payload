import CategoryComponent from "./category";
import { getPayload } from 'payload'
import config from '@payload-config'
import { Category } from '@/payload-types'

export default async function Categories() {

  const payload = await getPayload({ config })
  const { docs: categories } = await payload.find({
    collection: 'categories',
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      subcategories: true,
    },
  })

  const getPostsCount = async (categorySlug: string) => {
    return payload.count({
      collection: 'posts',
      where: {
        "category.slug": {
          equals: categorySlug
        }
      }
    });
  };

  return (
    <>
      {categories.map(async (category) => (
        <div key={category.id}>
          {((await getPostsCount(category.slug!)).totalDocs) ? (
            <CategoryComponent category={category as Category} />
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
}
