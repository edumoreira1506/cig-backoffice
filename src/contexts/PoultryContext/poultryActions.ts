import { IPoultryImage } from '@cig-platform/types'
import { PoultryState } from './poultryReducer'

export const setType = (type: string) => ({
  payload: { type },
  type: 'SET_TYPE'
} as const)

export const setBirthDate = (birthDate: string) => ({
  payload: { birthDate },
  type: 'SET_BIRTH_DATE'
} as const)

export const setGender = (gender: string) => ({
  payload: { gender },
  type: 'SET_GENDER'
} as const)

export const setColor = (color: string, field: keyof PoultryState['colors']) => ({
  payload: { color, field },
  type: 'SET_COLOR'
} as const)

export const setName = (name: string) => ({
  payload: { name },
  type: 'SET_NAME'
} as const)

export const setRegister = (register: string) => ({
  payload: { register },
  type: 'SET_REGISTER'
} as const)

export const setVideo = (video: string, field: keyof PoultryState['videos']) => ({
  payload: { video, field },
  type: 'SET_VIDEO'
} as const)

export const setImages = (images: IPoultryImage[]) => ({
  type: 'SET_IMAGES',
  payload: { images }
} as const)
