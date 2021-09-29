import { IBreeder } from '@cig-platform/types'

export const setBreeders = (breeders: IBreeder[]) => ({
  type: 'SET_BREEDERS',
  payload: { breeders }
} as const)

export const setSelected = (selected: string) => ({
  type: 'SET_SELECTED',
  payload: { selected }
} as const)
