import { Post } from '@/payload-types'
import BackgroundImageTitleExcerpt from '@/components/cards/backgroundImg-title-excerpt'
import PostCardBig from '@/components/cards/news-card-lg'

export default async function Highlights({
                                           mainHighlight,
                                           otherHighlights
}: {
  mainHighlight: Post, otherHighlights: Post[]
}) {

  return (
    <div className="w-full h-full">
      <div className="w-full h-fit md:h-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
        <div className="col-span-2 w-full h-full max-md:h-96">
          {mainHighlight && (
            <BackgroundImageTitleExcerpt
              news={mainHighlight}
            />
          )}
        </div>
        <div className="max-sm:hidden col-span-1 h-fit w-full md:h-full grid grid-cols-1 md:grid-rows-2 gap-y-10 md:gap-y-4">
          {otherHighlights.map((post) => (
            <div key={post.id} className="w-full h-full max-sm:h-96">
              <PostCardBig
                news={post}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
