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

export const setVaccinationName = (name: string) => ({
  payload: { name },
  type: 'SET_VACCINATION_NAME'
} as const)

export const setVaccinationDose = (dose: string) => ({
  payload: { dose },
  type: 'SET_VACCINATION_DOSE'
} as const)

export const setVaccinationDate = (date: string) => ({
  payload: { date },
  type: 'SET_VACCINATION_DATE'
} as const)
