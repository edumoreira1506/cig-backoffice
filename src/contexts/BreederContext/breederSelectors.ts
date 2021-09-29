import { BreederState } from './breederReducer'

export const selectBreeders = (state: BreederState) => state.breeders

export const selectSelected = (state: BreederState) => state.selected

export const selectSelectedBreeder = (state: BreederState) => selectBreeders(state).find((breeder) => breeder.id === selectSelected(state))
