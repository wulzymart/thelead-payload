import Link from "next/link";
import CategoryPosts from "./categoryPosts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Category, Subcategory } from '@/payload-types'

const CategoryComponent =async ({
                  category,
                }: {
  category: Category;
}) => {
  const payload = await getPayload({ config })
  const getPostsCount = async (slug: string) => {
    return payload.count({
      collection: 'posts',
      where: {
        "subcategories.slug": {
          contains: slug
        }
      }
    });
  };
  const subcategories =  category
    .subcategories
    ?.docs
    ?.filter(async (subcategory) => {
      console.log('filter')
      if ((subcategory as Subcategory).slug) return false
      const { totalDocs } = await getPostsCount((subcategory as Subcategory).slug!)
      console.log('total',totalDocs)
      return totalDocs > 0
    }) as Subcategory[]

  return (
    <section className="mx-auto mb-8">
      <div className="w-full my-8 flex justify-between items-center border-0 border-b-[3px] border-accent border-solid">
        <h3 className="font-serif text-2xl">{category.title}</h3>
        <Link
          href={`/${category.slug}`}
          className="no-underline uppercase font-medium text-accent"
        >
          View all &#10141;
        </Link>
      </div>
      <div className="text-accent uppercase gap-2 flex-wrap w-full">
        <Tabs defaultValue='all' className='bg-transparent'>
          <div className='w-full flex justify-end'>
            <TabsList className=''>
              <TabsTrigger value='all' >All</TabsTrigger>
              {
                subcategories.map((subcategory) => (
                  <TabsTrigger key={subcategory.id} value={subcategory.slug!} >{subcategory.title}</TabsTrigger>
                ))}
            </TabsList>
          </div>
          <TabsContent value='all'>
            <CategoryPosts category = {category.slug!} />
          </TabsContent>
          {subcategories.map((subcategory) => (
            <TabsContent key={subcategory.id} value={subcategory.slug!}>
              <CategoryPosts category = {category.slug!} subcategory = {subcategory.slug!}/>
              <Link
                href={`/${category.slug}/${subcategory.slug}`}
                className="no-underline text-xs uppercase font-medium text-accent"
              >
                View more &#10141;
              </Link>
            </TabsContent>
          ))}

        </Tabs>
      </div>
    </section>
  );
}
export default CategoryComponent;
