import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isSuperAdmin = (args: AccessArgs<User>) => boolean

export const isSuperAdmin: isSuperAdmin = ({ req: { user } }) => {
  return user?.role === 'super-admin'
}
