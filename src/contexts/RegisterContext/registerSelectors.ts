import { RegisterState } from './registerReducer'

export const selectType = (state: RegisterState) => state.type

export const selectDescription = (state: RegisterState) => state.description

export const selectFiles = (state: RegisterState) => state.files

export const selectVaccination = (state: RegisterState) => state.vaccination

export const selectVaccinationName = (state: RegisterState) => selectVaccination(state).name

export const selectVaccinationDose = (state: RegisterState) => selectVaccination(state).dose

export const selectVaccinationDate = (state: RegisterState) => selectVaccination(state).date

export const selectMeasurementAndWeighing = (state: RegisterState) => state.measurementAndWeighing

export const selectMeasurement = (state: RegisterState) => selectMeasurementAndWeighing(state).measurement

export const selectWeight = (state: RegisterState) => selectMeasurementAndWeighing(state).weight

export const selectMeasurementAndWeighingDate = (state: RegisterState) => selectMeasurementAndWeighing(state).date

export const selectRefetchData = (state: RegisterState) => state.refetchData
