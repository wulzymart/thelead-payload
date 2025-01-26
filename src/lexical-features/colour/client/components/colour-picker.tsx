'use client'

import '@/app/(frontend)/globals.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeColorsView } from '../views/theme-view'
import { ColorPickerView } from '../views/colour-picker-view'
import { useState } from 'react'

type DropdownColorPickerProps = {
  fontColor?: string
  onColorChange: (color: string, cssVariableColor?: string) => void
  onApplyStyles: () => void
}

export type ColorSpectrum = 'hex' | 'hsl' | 'rgb'

const defaultColor = '#000000'

export const ColorPicker = ({
                              fontColor = defaultColor,
                              onColorChange,
                              onApplyStyles,
                            }: DropdownColorPickerProps) => {
  const [colorSpectrum, setColorSpectrum] = useState<ColorSpectrum>('hex')

  return (
    <div className="flex">
      <Tabs defaultValue="theme" className="h-[350px] w-[310px]">
        <TabsList className="gap-1 mb-2">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="color-picker">Color Picker</TabsTrigger>
        </TabsList>
        <TabsContent value="theme">
          <ThemeColorsView
            colorSpectrum={colorSpectrum}
            onColorSpectrumChange={setColorSpectrum}
            onFontColorChange={onColorChange}
          />
        </TabsContent>
        <TabsContent value="color-picker">
          <ColorPickerView
            onApplyStyles={onApplyStyles}
            fontColor={fontColor}
            onFontColorChange={onColorChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
