import { DefaultState, ActionType } from '@cig-platform/context'
import { RegisterTypeEnum } from '@cig-platform/enums'

import * as actions from './registerActions'

export interface IFile {
  file: File;
  src: string;
}

export interface RegisterState extends DefaultState {
  type: string;
  description: string;
  files: IFile[];
  vaccination: {
    name: string;
    dose: string;
    date: string;
  };
  measurementAndWeighing: {
    weight: string;
    date: string;
    measurement: string;
  };
  refetchData: boolean;
}

export const INITIAL_STATE: RegisterState = {
  type: RegisterTypeEnum.Images,
  description: '',
  files: [],
  refetchData: false,
  vaccination: {
    name: '',
    dose: '',
    date: '',
  },
  measurementAndWeighing: {
    weight: '',
    measurement: '',
    date: '',
  }
}

export type RegisterActionTypes = ActionType<typeof actions>

export default function breederReducer(
  state = INITIAL_STATE,
  action: RegisterActionTypes
): RegisterState {
  switch (action.type) {
  case 'SET_REFETCH_DATA':
    return { ...state, refetchData: action.payload.refetchData }
  case 'SET_DESCRIPTION':
    return { ...state, description: action.payload.description }
  case 'SET_TYPE':
    return { ...state, type: action.payload.type }
  case 'SET_FILES':
    return { ...state, files: action.payload.files }
  case 'SET_VACCINATION_NAME':
    return { ...state, vaccination: { ...state.vaccination, name: action.payload.name } }
  case 'SET_VACCINATION_DOSE':
    return { ...state, vaccination: { ...state.vaccination, dose: action.payload.dose } }
  case 'SET_VACCINATION_DATE':
    return { ...state, vaccination: { ...state.vaccination, date: action.payload.date } }
  case 'SET_MEASUREMENT':
    return { ...state, measurementAndWeighing: { ...state.measurementAndWeighing, measurement: action.payload.measurement } }
  case 'SET_WEIGHING':
    return { ...state, measurementAndWeighing: { ...state.measurementAndWeighing, weight: action.payload.weight } }
  case 'SET_MEASUREMENT_AND_WEIGHIN_DATE':
    return { ...state, measurementAndWeighing: { ...state.measurementAndWeighing, date: action.payload.date } }
  default:
    return state
  }
}
