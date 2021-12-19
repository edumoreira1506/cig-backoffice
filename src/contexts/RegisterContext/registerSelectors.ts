import { RegisterState } from './registerReducer'

export const selectType = (state: RegisterState) => state.type

export const selectDescription = (state: RegisterState) => state.description

export const selectFiles = (state: RegisterState) => state.files

export const selectVaccination = (state: RegisterState) => state.vaccination

export const selectVaccinationName = (state: RegisterState) => selectVaccination(state).name

export const selectVaccinationDose = (state: RegisterState) => selectVaccination(state).dose

export const selectVaccinationDate = (state: RegisterState) => selectVaccination(state).date
