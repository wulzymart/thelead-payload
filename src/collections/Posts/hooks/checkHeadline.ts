import type {CollectionBeforeValidateHook} from 'payload'

export const checkHeadline: CollectionBeforeValidateHook  = ({data}) =>{
  if (data &&!data.isHeadline) data.isMajorHeadline = false
}
