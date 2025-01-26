import { CollectionBeforeValidateHook } from 'payload'

export const currentUserAsAuthor: CollectionBeforeValidateHook= ({ data, req }) => {
  if (req.user && data) {
    data.author = req.user.id
  }

  return data
}
