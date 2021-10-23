import { DefaultState, ActionType } from '@cig-platform/context'
import { IPoultryColors, IPoultryImage, IPoultryVideos } from '@cig-platform/types'

import * as actions from './poultryActions'

export interface PoultryImage extends IPoultryImage {
  isNew?: boolean;
  isDeleted?: boolean;
  raw?: File;
}

export interface PoultryState extends DefaultState {
  type: string;
  birthDate: string;
  colors: IPoultryColors;
  videos: IPoultryVideos;
  images: PoultryImage[];
  gender: string;
  name: string;
}

export const INITIAL_STATE: PoultryState = {
  type: '',
  name: '',
  birthDate: '',
  colors: {
    plumage: '#ffffff',
    shins: '#ffffff',
    eyes: '#ffffff'
  },
  videos: {
    presentation: '',
    walking: '',
    measurement: '',
  },
  images: [] as PoultryImage[],
  gender: '',
}

export type PoultryActionTypes = ActionType<typeof actions>

export default function breederReducer(
  state = INITIAL_STATE,
  action: PoultryActionTypes
): PoultryState {
  switch (action.type) {
  case 'SET_NAME':
    return {
      ...state,
      name: action.payload.name 
    }
  case 'SET_GENDER':
    return {
      ...state,
      gender: action.payload.gender
    }
  case 'SET_IMAGES':
    return {
      ...state,
      images: action.payload.images
    }
  case 'SET_VIDEO':
    return {
      ...state,
      videos: {
        ...state.videos,
        [action.payload.field]: action.payload.video
      }
    }
  case 'SET_COLOR':
    return {
      ...state,
      colors: {
        ...state.colors,
        [action.payload.field]: action.payload.color
      }
    }
  case 'SET_TYPE':
    return { ...state, type: action.payload.type }
  case 'SET_BIRTH_DATE':
    return { ...state, birthDate: action.payload.birthDate }
  default:
    return state
  }
}
