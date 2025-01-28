'use client'

import React, { useEffect, useState } from 'react'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection'
import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { ColorPicker } from '@/lexical-features/colour/client/components/colour-picker'
import {  FontColorIcon } from '@/lexical-features/colour/client/icons/colour-icon'
import { translateColor } from '@/lexical-features/colour/utils/translateColor'
import { PaintBucketIcon } from 'lucide-react'

// create the target type
type ColorType = 'font' | 'background'


export const DropdownColorPicker = ({colorType}: {colorType: ColorType}) => {
  const [colour, setColour] = useState<string | undefined>('')
  const [editor] = useLexicalComposerContext()

  const [CSSVariable, setCSSVariable] = useState<string | null>(null)

  function getNodeStyles(node: HTMLElement) {
    const computedStyle = getComputedStyle(node)
    return {
      color: colorType === 'font' ? computedStyle.color : computedStyle.backgroundColor,
    }
  }

  const setNodesDefaultColor = () => {
    editor.update(() => {
      const selection = $getSelection()

      if (!selection) return

      const nodes = selection.getNodes()

      // Check each node for the default color
      const defaultColor = nodes.reduce<string | undefined>((acc, node) => {
        const domNode = editor.getElementByKey(node.getKey())
        if (domNode) {
          const HEXcolor = translateColor(getNodeStyles(domNode).color, 'HEX')
          // If it is the first node, set the default color
          if (acc === '') {
            acc = HEXcolor
            return acc
            // If it is not the first node, check if the color is the same
          } else if (acc === HEXcolor) {
            return acc
            // The color is not the same as the first node, so return the default color
            // Meaning there are multiple nodes with different colors
          } else {
            return undefined
          }
        }
      }, '')
      setColour(defaultColor)
    })
  }

  const applyStyleTextToNodes = (style: Record<string, string | null>) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, style)
      }
    })

  }
  const [open, setOpen]  = useState(false)

  const onModalClose = () => {
    if (colour) {
      const toApply = CSSVariable ?? colour
      const style = {} as any
      if (colorType === 'background') {
        style['background-color'] = toApply
      } else {
        style.color = toApply
      }
      applyStyleTextToNodes(style)
    }
    setOpen(false)
  }

  const onModalOpen = () => {
    // Apply false styling if focus is lost from Lexical
    setOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    if (open) onModalOpen()
    else onModalClose()
  }

  const handleColorChange = (color: string, cssVariableColor?: string) => {
    if (cssVariableColor) setCSSVariable(cssVariableColor)
    else setCSSVariable(null)
    setColour(color)
  }
  useEffect(() => {
    setNodesDefaultColor()
  }, [])

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className="">
        {colorType === 'font' ? <FontColorIcon underscoreColor={colour} />: <PaintBucketIcon style={{backgroundColor: colour}}/> }
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ColorPicker
          onApplyStyles={() =>{
            onModalClose()
           setOpen(false)
          }}
          fontColor={colour}
          onColorChange={handleColorChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
