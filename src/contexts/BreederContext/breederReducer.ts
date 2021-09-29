import { DefaultState, ActionType } from '@cig-platform/context'
import { IBreeder } from '@cig-platform/types'

import * as actions from './breederActions'

export interface BreederState extends DefaultState {
  breeders: IBreeder[];
  selected: IBreeder['id'];
}

export const INITIAL_STATE: BreederState = {
  breeders: [],
  selected: '',
}

export type BreederActionTypes = ActionType<typeof actions>

export default function breederReducer(
  state = INITIAL_STATE,
  action: BreederActionTypes
): BreederState {
  switch (action.type) {
  case 'SET_BREEDERS':
    return { ...state, breeders: action.payload.breeders }
  case 'SET_SELECTED':
    return { ...state, selected: action.payload.selected }
  default:
    return state
  }
}
