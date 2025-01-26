import Highlights from "./highlights";
import { LatestNews } from "./latest-news";
import { Post} from '@/payload-types'
import { getPayload, Where } from 'payload'
import config from '@payload-config'

export async function Heading({
  category, subcategory
}: {
  category?: string,
  subcategory?: string
}) {
  const where: Where = {
    _status: {
      equals: "published"
    },
  }

  if (subcategory) where["subcategories.slug"] = {equals: subcategory}
  else if (category) {
    where["category.slug"] = {equals: category}
  }
  const payload = await getPayload({ config })
  const {docs: latestNews} = await payload.find({
    collection: "posts",
    limit: 6,
    sort: "-createdAt",
    where
  })
  const mHWhere: Where = {...where, isMajorHeadline: {equals: true}, createdAt: {
      greater_than_equal: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    }}
  const { docs: majorHighlights } = await payload.find({
    collection: 'posts',
    where: mHWhere,
    sort: '-createdAt',
    limit: 1,
  })
  const oHWhere: Where = {...mHWhere, isMajorHeadline: {equals: false},
    isHeadline: {
      equals: true,
    }}
  const { docs: otherHeadlines } = await payload.find({
    collection: 'posts',
    where: oHWhere,
    sort: '-createdAt',
    limit: 3,
  })
  const { docs: nonHeadlines } = await payload.find({
    collection: 'posts',
    where: {
      ...where,
      isMajorHeadline: {
        equals: false,
      },
      isHeadline: {
        equals: false,
      },
      _status: {
        equals: 'published',
      },
      createdAt: {
        greater_than_equal: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      },
    },
    sort: '-createdAt',
    limit: 3,
  })
  let mainHighlight: Post | undefined = undefined;
  const otherHighlights: Post[] = [];
  if (majorHighlights.length){
    mainHighlight = majorHighlights[0]
    if (otherHeadlines.length > 0){
      otherHighlights.push(...otherHeadlines.slice(0,2))
      if (otherHighlights.length < 2) otherHighlights.push(...nonHeadlines.slice(0, 2 - otherHighlights.length ))
    }
  } else {
    if (otherHeadlines.length > 0) {
      mainHighlight = otherHeadlines[0]
      otherHighlights.push(...otherHeadlines.slice(1,3))
      if (otherHighlights.length < 2) otherHighlights.push(...nonHeadlines.slice(0, 2 - otherHighlights.length ))
    }else {
      mainHighlight = nonHeadlines[0]
      otherHighlights.push(...nonHeadlines.slice(1,3))
    }
  }


  return (
    <section className="w-[90%] mt-8 h-fit lg:min-h-[550px] mx-auto grid grid-col-1 lg:grid-cols-7 gap-4">
      <div className="col-span-1 max-lg:order-2 max-lg mt-8 lg:col-span-2 h-fit w-full">
        <LatestNews news={latestNews} />
      </div>
      <div className="col-span-1 max-lg:order-1 lg:col-span-5 max-sm:h-fit w-full">
        <Highlights {...{mainHighlight: mainHighlight!, otherHighlights}} />
      </div>
    </section>
  );
}
