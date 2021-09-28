import { DefaultState, ActionType } from '@cig-platform/context'

import * as actions from './editBreederActions'

export interface EditBreederState extends DefaultState {
  name: string;
  description: string;
  address: {
    city: string;
    zipcode: string;
    province: string;
    street: string;
    number: number;
  }
  foundationDate: string;
}

export const INITIAL_STATE = {
  name: '',
  description: '',
  address: {
    city: '',
    province: '',
    street: '',
    zipcode: '',
    number: 0
  },
  foundationDate: ''
}

export type EditBreederActionTypes = ActionType<typeof actions>

export default function loginReducer(
  state = INITIAL_STATE,
  action: EditBreederActionTypes
): EditBreederState {
  switch (action.type) {
  case 'SET_ERROR':
    return { ...state, error: action.payload.error }
  case 'SET_IS_LOADING':
    return { ...state, isLoading: action.payload.isLoading }
  case 'SET_NAME':
    return { ...state, name: action.payload.name }
  case 'SET_ADDRESS_FIELD':
    return { ...state, address: { ...state.address, [action.payload.key]: action.payload.value } }
  case 'SET_DESCRIPTION':
    return { ...state, description: action.payload.description }
  case 'SET_FOUNDATION_DATE':
    return { ...state, foundationDate: action.payload.foundationDate }
  default:
    return state
  }
}
