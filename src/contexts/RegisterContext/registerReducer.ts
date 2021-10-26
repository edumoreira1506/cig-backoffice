import { DefaultState, ActionType } from '@cig-platform/context'

import * as actions from './registerActions'

export interface RegisterState extends DefaultState {
  type: string;
  description: string;
  files: File[]
}

export const INITIAL_STATE: RegisterState = {
  type: 'IMAGENS',
  description: '',
  files: [],
}

export type RegisterActionTypes = ActionType<typeof actions>

export default function breederReducer(
  state = INITIAL_STATE,
  action: RegisterActionTypes
): RegisterState {
  switch (action.type) {
  case 'SET_DESCRIPTION':
    return { ...state, description: action.payload.description }
  case 'SET_TYPE':
    return { ...state, type: action.payload.type }
  case 'SET_FILES':
    return { ...state, files: action.payload.files }
  default:
    return state
  }
}
