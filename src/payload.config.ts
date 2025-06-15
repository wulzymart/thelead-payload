// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { s3Storage } from '@payloadcms/storage-s3'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Subcategories } from '@/collections/Subcategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      title: 'Admin area | The Lead Nigeria',
      description: 'Admin area for The Lead Nigeria',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/logo-small.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '@/components/logo#Logo',
        Icon: '@/components/logo#Icon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Posts, Media, Categories, Users, Subcategories],
  upload: {
    debug: true,
  },
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    // s3Storage({
    //   collections: {
    //     media: true,
    //   },
    //   bucket: process.env.S3_BUCKET_NAME!,
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY!,
    //       secretAccessKey: process.env.S3_SECRET_KEY!,
    //     },
    //     endpoint: process.env.S3_ENDPOINT,
    //     region: process.env.S3_REGION,
    //     forcePathStyle: true,
    //   },
    // }),
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
