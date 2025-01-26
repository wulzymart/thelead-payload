import { Button } from '@payloadcms/ui'

export function WeightComponent({weight}: {weight: number}) {
  return (
    <Button>{weight} pt</Button>
  )
}
