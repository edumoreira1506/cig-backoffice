import { PoultryState } from './poultryReducer'

export const selectType = (state: PoultryState) => state.type

export const selectBirthDate = (state: PoultryState) => state.birthDate

export const selectColors = (state: PoultryState) => state.colors

export const selectVideos = (state: PoultryState) => state.videos

export const selectImages = (state: PoultryState) => state.images

export const selectGender = (state: PoultryState) => state.gender

export const selectName = (state: PoultryState) => state.name

export const selectRegister = (state: PoultryState) => state.register
