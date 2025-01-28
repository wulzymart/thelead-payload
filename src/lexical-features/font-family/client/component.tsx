'use client'
import { $getSelection } from '@payloadcms/richtext-lexical/lexical'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection'
import { JSX, useCallback } from 'react'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
const FONT_FAMILY_OPTIONS: [string, string][] = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];
export function FontFamilyDropDown(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          console.log(selection, option)
          $patchStyleText(selection, {
            'font-family': option,
          });
        }
      });
    },
    [editor],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span>Font Family</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {FONT_FAMILY_OPTIONS.map(
          ([option, text]) => (
            <DropdownMenuItem
              onClick={() => handleClick(option)}
              key={option}>
              <span className="text">{text}</span>
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
