import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeedText from "../cards/feed-text-breaking";
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function BreakingNews() {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'posts',
    depth: 1,
    where: {
      _status: {
        equals: 'published',
      },
      isBreaking: {
        equals: true,
      },
      createdAt: {
        greater_than_equal: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      }
      },
    limit: 10,
    sort: "-createdAt",
  })
  const posts = res.docs
  return posts ? (
    posts.length ? (
      <section className="max-sm:hidden w-[70%] md:w-[85%] lg:w-[90%] md mx-auto mt-6">
        <p className="italic font-semibold">Breaking</p>
        <Carousel
          opts={{
            align: "center",
          }}
          className=""
        >
          <CarouselContent className="">
            {posts.map((post) => (
              <CarouselItem
                key={post.id}
                className="md:basis-1/2 lg:basis-1/4 basis-full"
              >
                <div className="p-1">
                  <FeedText
                    news={post}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div>
            <CarouselPrevious className="" />
          </div>
          <CarouselNext />
        </Carousel>
      </section>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
}
