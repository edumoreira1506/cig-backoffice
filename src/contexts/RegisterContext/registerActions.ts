import { IFile } from './registerReducer'

export const setDescription = (description: string) => ({
  payload: { description },
  type: 'SET_DESCRIPTION'
} as const)

export const setType = (type: string) => ({
  payload: { type },
  type: 'SET_TYPE'
} as const)

export const setFiles = (files: IFile[]) => ({
  payload: { files },
  type: 'SET_FILES'
} as const)
