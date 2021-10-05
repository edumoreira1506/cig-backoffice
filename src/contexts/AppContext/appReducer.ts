import { DefaultState, ActionType } from '@cig-platform/context'

import * as actions from './appActions'

export type AppState = DefaultState

export const INITIAL_STATE: AppState = {
}

export type AppActionTypes = ActionType<typeof actions>

export default function appReducer(
  state = INITIAL_STATE,
  action: AppActionTypes
): AppState {
  switch (action.type) {
  case 'SET_IS_LOADING':
    return { ...state, isLoading: action.payload.isLoading }
  case 'SET_ERROR':
    return { ...state, error: action.payload.error }
  default:
    return state
  }
}
