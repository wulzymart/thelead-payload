import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isEditor = (args: AccessArgs<User>) => boolean

export const isEditor: isEditor = ({ req: { user } }) => {
  return user?.role === 'editor'
}
