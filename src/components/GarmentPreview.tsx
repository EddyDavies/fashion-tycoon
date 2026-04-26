import type { DesignState } from '../state/designState'
import { isHoodie, isTshirt } from '../state/designState'
import HoodiePreview from './garments/HoodiePreview'
import TshirtPreview from './garments/TshirtPreview'
import ShirtPreview from './garments/ShirtPreview'

interface Props {
  state: DesignState
}

export function GarmentPreview({ state }: Props) {
  if (isHoodie(state)) return <HoodiePreview state={state} />
  if (isTshirt(state)) return <TshirtPreview state={state} />
  return <ShirtPreview state={state} />
}
