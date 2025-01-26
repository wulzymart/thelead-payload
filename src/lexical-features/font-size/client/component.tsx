import { Button } from '@payloadcms/ui'

export function SizeComponent({size}: {size: number}) {
  return (
    <Button>{size} pt</Button>
  )
}
