import { useReducer, useEffect } from 'react'
import type { DesignState, HoodieDetails, TshirtDetails, ShirtDetails } from './designState'
import { initialDesignState } from './designState'

type ColourUpdate = Partial<DesignState['colour']>
type BrandUpdate = Partial<DesignState['brand']>

type Action =
  | { type: 'SET_GARMENT_TYPE'; payload: DesignState['garmentType'] }
  | { type: 'SET_SILHOUETTE'; payload: DesignState['silhouette'] }
  | { type: 'SET_MATERIAL'; payload: DesignState['material'] }
  | { type: 'SET_COLOUR'; payload: ColourUpdate }
  | { type: 'SET_HOODIE_DETAILS'; payload: Partial<HoodieDetails> }
  | { type: 'SET_TSHIRT_DETAILS'; payload: Partial<TshirtDetails> }
  | { type: 'SET_SHIRT_DETAILS'; payload: Partial<ShirtDetails> }
  | { type: 'SET_BRAND'; payload: BrandUpdate }
  | { type: 'RESET' }

function getDefaultDetails(garmentType: DesignState['garmentType']): DesignState['details'] {
  if (garmentType === 'hoodie') return { hood: 'standard', pocket: 'kangaroo', zipper: false, drawstrings: true, embroidery: false }
  if (garmentType === 'tshirt') return { neckline: 'crew', sleeves: 'short', hem: 'straight', graphic: false }
  return { sleeve: 'short', collar: 'standard', pocket: false, embroidery: false }
}

function reducer(state: DesignState, action: Action): DesignState {
  switch (action.type) {
    case 'SET_GARMENT_TYPE': {
      const details = getDefaultDetails(action.payload)
      return { ...state, garmentType: action.payload, details } as DesignState
    }
    case 'SET_SILHOUETTE': return { ...state, silhouette: action.payload }
    case 'SET_MATERIAL': return { ...state, material: action.payload }
    case 'SET_COLOUR': return { ...state, colour: { ...state.colour, ...action.payload } }
    case 'SET_HOODIE_DETAILS':
      if (state.garmentType !== 'hoodie') return state
      return { ...state, details: { ...state.details, ...action.payload } } as DesignState
    case 'SET_TSHIRT_DETAILS':
      if (state.garmentType !== 'tshirt') return state
      return { ...state, details: { ...state.details, ...action.payload } } as DesignState
    case 'SET_SHIRT_DETAILS':
      if (state.garmentType !== 'shirt') return state
      return { ...state, details: { ...state.details, ...action.payload } } as DesignState
    case 'SET_BRAND': return { ...state, brand: { ...state.brand, ...action.payload } }
    case 'RESET': return initialDesignState
    default: return state
  }
}

const DESIGN_KEY = 'fashion-game-design'
const STEP_KEY = 'fashion-game-step'

export function useDesign() {
  const savedDesign = (() => { try { return JSON.parse(localStorage.getItem(DESIGN_KEY) || 'null') } catch { return null } })()
  const savedStep = (() => { try { return Math.max(0, Math.min(6, parseInt(localStorage.getItem(STEP_KEY) || '0', 10))) } catch { return 0 } })()

  const [state, dispatch] = useReducer(reducer, savedDesign ?? initialDesignState)
  const [step, setStepRaw] = useReducer((_: number, s: number) => Math.max(0, Math.min(6, s)), savedStep)

  useEffect(() => { localStorage.setItem(DESIGN_KEY, JSON.stringify(state)) }, [state])
  useEffect(() => { localStorage.setItem(STEP_KEY, String(step)) }, [step])

  return {
    state,
    step,
    setGarmentType: (v: DesignState['garmentType']) => dispatch({ type: 'SET_GARMENT_TYPE', payload: v }),
    setSilhouette: (v: DesignState['silhouette']) => dispatch({ type: 'SET_SILHOUETTE', payload: v }),
    setMaterial: (v: DesignState['material']) => dispatch({ type: 'SET_MATERIAL', payload: v }),
    setColour: (v: ColourUpdate) => dispatch({ type: 'SET_COLOUR', payload: v }),
    setHoodieDetails: (v: Partial<HoodieDetails>) => dispatch({ type: 'SET_HOODIE_DETAILS', payload: v }),
    setTshirtDetails: (v: Partial<TshirtDetails>) => dispatch({ type: 'SET_TSHIRT_DETAILS', payload: v }),
    setShirtDetails: (v: Partial<ShirtDetails>) => dispatch({ type: 'SET_SHIRT_DETAILS', payload: v }),
    setBrand: (v: BrandUpdate) => dispatch({ type: 'SET_BRAND', payload: v }),
    nextStep: () => setStepRaw(step + 1),
    prevStep: () => setStepRaw(step - 1),
    goToStep: (s: number) => setStepRaw(s),
    reset: () => { localStorage.removeItem(DESIGN_KEY); localStorage.removeItem(STEP_KEY); dispatch({ type: 'RESET' }) },
  }
}
