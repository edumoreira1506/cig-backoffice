import { DefaultState, ActionType } from '@cig-platform/context'

import { PROFILE_IMAGE_PLACEHOLDER } from '../../constants/s3'

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
  id: string;
  profileImage: File;
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
  foundationDate: '',
  id: '',
  profileImage: new File([''], PROFILE_IMAGE_PLACEHOLDER),
}

export type EditBreederActionTypes = ActionType<typeof actions>

export default function editBreederReducer(
  state = INITIAL_STATE,
  action: EditBreederActionTypes
): EditBreederState {
  switch (action.type) {
  case 'SET_PROFILE_IMAGE':
    return { ...state, profileImage: action.payload.profileImage }
  case 'SET_ID':
    return { ...state, id: action.payload.id }
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
