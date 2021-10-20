import { IBreederContact, IBreederImage } from '@cig-platform/types'
import { EditBreederState } from './editBreederReducer'

export const setIsLoading = (isLoading: boolean) => ({
  type: 'SET_IS_LOADING',
  payload: { isLoading }
} as const)

export const setImages = (images: IBreederImage[]) => ({
  type: 'SET_IMAGES',
  payload: { images }
} as const)

export const setMainVideo = (mainVideo: string) => ({
  type: 'SET_MAIN_VIDEO',
  payload: { mainVideo }
} as const)

export const setName = (name: string) => ({
  type: 'SET_NAME',
  payload: { name }
} as const)

export const setFoundationDate = (foundationDate: string) => ({
  type: 'SET_FOUNDATION_DATE',
  payload: { foundationDate }
} as const)

export const setDescription = (description: string) => ({
  type: 'SET_DESCRIPTION',
  payload: { description }
} as const)

export const setId = (id: string) => ({
  type: 'SET_ID',
  payload: { id }
} as const)

export const setAddressField = (key: keyof EditBreederState['address'], value: string | number) => ({
  type: 'SET_ADDRESS_FIELD',
  payload: { key, value }
} as const)

export const setProfileImage = (profileImage: File) => ({
  type: 'SET_PROFILE_IMAGE',
  payload: { profileImage }
} as const)

export const setContacts = (contacts: IBreederContact[]) => ({
  type: 'SET_CONTACTS',
  payload: { contacts }
} as const)
