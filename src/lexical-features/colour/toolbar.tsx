import type { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical'

export const toolbarAddDropdownGroupWithItems = (items: ToolbarGroupItem[]): ToolbarGroup => {
  return {
    type: 'buttons',
    items,
    key: 'colour',
    order: 10,
  }
}
