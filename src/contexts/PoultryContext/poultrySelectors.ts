import { PoultryState } from './poultryReducer'

export const selectType = (state: PoultryState) => state.type

export const selectBirthDate = (state: PoultryState) => state.birthDate

export const selectColors = (state: PoultryState) => state.colors

export const selectVideos = (state: PoultryState) => state.videos

export const selectImages = (state: PoultryState) => state.images

export const selectGender = (state: PoultryState) => state.gender

export const selectGenderCategory = (state: PoultryState) => state.genderCategory

export const selectAvailableGenderCategories = (state: PoultryState) => state.availableGenderCategories

export const selectName = (state: PoultryState) => state.name

export const selectRegister = (state: PoultryState) => state.register

export const selectCrest = (state: PoultryState) => state.crest

export const selectDewlap = (state: PoultryState) => state.dewlap

export const selectTail = (state: PoultryState) => state.tail

export const selectDescription = (state: PoultryState) => state.description

export const selectMeasurement = (state: PoultryState) => state.measurement

export const selectWeight = (state: PoultryState) => state.weight
