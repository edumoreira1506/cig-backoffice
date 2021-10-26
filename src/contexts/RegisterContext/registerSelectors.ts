import { RegisterState } from './registerReducer'

export const selectType = (state: RegisterState) => state.type

export const selectDescription = (state: RegisterState) => state.description

export const selectFiles = (state: RegisterState) => state.files
