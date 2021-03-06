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
  register: string;
  birthDate: string;
  colors: IPoultryColors;
  videos: IPoultryVideos;
  images: PoultryImage[];
  gender: string;
  genderCategory: string;
  name: string;
  crest: string;
  dewlap: string;
  tail: string;
  description: string;
  availableGenderCategories: string[];
  measurement?: number;
  weight?: number;
}

export const INITIAL_STATE: PoultryState = {
  type: '',
  name: '',
  birthDate: '',
  crest: '',
  description: '',
  register: '',
  tail: '',
  dewlap: '',
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
  genderCategory: '',
  availableGenderCategories: [],
  measurement: undefined,
  weight: undefined,
}

export type PoultryActionTypes = ActionType<typeof actions>

export default function breederReducer(
  state = INITIAL_STATE,
  action: PoultryActionTypes
): PoultryState {
  switch (action.type) {
  case 'SET_MEASUREMENT':
    return {
      ...state,
      measurement: action.payload.measurement
    }
  case 'SET_WEIGHT':
    return {
      ...state,
      weight: action.payload.weight
    }
  case 'SET_GENDER_CATEGORY':
    return {
      ...state,
      genderCategory: action.payload.genderCategory
    }
  case 'SET_AVAILABLE_GENDER_CATEGORIES':
    return {
      ...state,
      availableGenderCategories: action.payload.genderCategories
    }
  case 'SET_DESCRIPTION':
    return {
      ...state,
      description: action.payload.description
    }
  case 'SET_DEWLAP':
    return {
      ...state,
      dewlap: action.payload.dewlap
    }
  case 'SET_TAIL':
    return {
      ...state,
      tail: action.payload.tail
    }
  case 'SET_CREST':
    return {
      ...state,
      crest: action.payload.crest
    }
  case 'SET_REGISTER':
    return {
      ...state,
      register: action.payload.register
    }
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
