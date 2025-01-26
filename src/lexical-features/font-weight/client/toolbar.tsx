'use client'
import type { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import {
  $getSelection, $isRangeSelection,
} from '@payloadcms/richtext-lexical/lexical'
import { $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection'
import { FONT_WEIGHTS } from '@/lexical-features/font-weight/client/constants'




export const toolbarAddDropdownGroupWithItems = (items: ToolbarGroupItem[]): ToolbarGroup => {
  return {
    type: 'dropdown',
    ChildComponent: () => <p>Font Weight</p>,
    items,
    key: 'Font Weight',
    order: 10,
  }
}

export const toolbarGroups = toolbarAddDropdownGroupWithItems(FONT_WEIGHTS.map(weight => ({
  type: 'button',
  label: `${weight} pt`,
  key: `font-weight-${weight}`,
  onSelect: ({ editor }) => {
    editor.update(() => {
      const selection = $getSelection()
      if (selection && $isRangeSelection(selection)){
        $patchStyleText(selection, { 'font-weight': `${weight}` })
      }
    })
  },
})))


