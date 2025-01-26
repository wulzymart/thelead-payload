'use client'
import type { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import { FONT_SIZES } from '@/lexical-features/font-size/client/constants'
import {
  $getSelection, $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import { $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection'



export const toolbarAddDropdownGroupWithItems = (items: ToolbarGroupItem[]): ToolbarGroup => {
  return {
    type: 'dropdown',
    ChildComponent:  () => <p>Size</p>,
    items,
    key: 'Font Size',
    order: 10,
  }
}

export const toolbarGroups = toolbarAddDropdownGroupWithItems(FONT_SIZES.map(size => ({
  type: 'button',
  label: `${size} pt`,
  key: `font-size-${size}`,

  onSelect: ({ editor }) => {
    editor.update(() => {
      const selection = $getSelection()
      if (selection && $isRangeSelection(selection)){
        $patchStyleText(selection, { 'font-size': `${size}px` })
      }
    })
  },
})))


