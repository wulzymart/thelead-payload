import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'The Lead Nigeria, A leading news agency in Nigeria with authority in the energey and finance sector',
  images: [
    {
      url: `${getServerSideURL()}/logo.png`,
    },
  ],
  siteName: 'The Lead Nigeria | Authority News agency in Nigeria',
  title: 'The Lead Nigeria | Authority News agency in Nigeria',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
