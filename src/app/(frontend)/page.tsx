import { Heading } from '@/heading/heading'
import BreakingNews from '@/components/home-components/breaking-news'
import Categories from '@/components/home-components/category/categories'
import Subscribe from '@/components/cards/subscribe'
import ShellAdvert from '@/components/cards/shell-advert'


// export { generateMetadata }

export default async function HomePage () {
  return (<main className="overflow-hidden">
    <BreakingNews />
    <Heading />
    <div className="my-8 w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div className="md:col-span-2 lg:col-span-3">
        <Categories />
      </div>
      <aside className="col-span-1 flex flex-col gap-8">
        <Subscribe />
        <ShellAdvert />
      </aside>
    </div>
  </main>)
}
