import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthor = (args: AccessArgs<User>) => boolean

export const isAuthor: isAuthor = ({ req: { user } }) => {
  return user?.role === 'author'
}
