# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.js file.
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile


FROM node:22.12.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
# ENV DATABASE_URI=${DATABASE_URI}

# Or use a PG connection string
#DATABASE_URI=postgresql://127.0.0.1:5432/your-database-name
ARG PAYLOAD_SECRET
ARG CRON_SECRET
ARG DATABASE_URI
ARG S3_BUCKET_NAME
ARG S3_ACCESS_KEY
ARG S3_SECRET_KEY
ARG S3_ENDPOINT
ARG S3_REGION
# Used to encrypt JWT tokens
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV CRON_SECRET=$CRON_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV S3_ACCESS_KEY=$S3_ACCESS_KEY
ENV S3_BUCKET_NAME=$S3_BUCKET_NAME
ENV S3_SECRET_KEY=$S3_SECRET_KEY
ENV S3_REGION=$S3_REGION
ENV S3_ENDPOINT=$S3_ENDPOINT

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ARG PAYLOAD_SECRET
ARG CRON_SECRET
ARG DATABASE_URI
ARG S3_BUCKET_NAME
ARG S3_ACCESS_KEY
ARG S3_SECRET_KEY
ARG S3_ENDPOINT
ARG S3_REGION

ENV NODE_ENV=production
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV CRON_SECRET=$CRON_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV S3_ACCESS_KEY=$S3_ACCESS_KEY
ENV S3_BUCKET_NAME=$S3_BUCKET_NAME
ENV S3_SECRET_KEY=$S3_SECRET_KEY
ENV S3_REGION=$S3_REGION
ENV S3_ENDPOINT=$S3_ENDPOINT

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Remove this line if you do not have this folder
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
