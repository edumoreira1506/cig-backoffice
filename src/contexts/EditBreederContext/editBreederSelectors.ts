import { EditBreederState } from './editBreederReducer'

export const selectName = (state: EditBreederState) => state.name

export const selectDescription = (state: EditBreederState) => state.description

export const selectAddress = (state: EditBreederState) => state.address

export const selectAddressCity = (state: EditBreederState) => selectAddress(state).city

export const selectAddressProvince = (state: EditBreederState) => selectAddress(state).province

export const selectAddressStreet = (state: EditBreederState) => selectAddress(state).street

export const selectAddressNumber = (state: EditBreederState) => selectAddress(state).number

export const selectAddressZipcode = (state: EditBreederState) => selectAddress(state).zipcode

export const selectIsLoading = (state: EditBreederState) => state.isLoading

export const selectError = (state: EditBreederState) => state.error

export const selectFoundationDate = (state: EditBreederState) => state.foundationDate

export const selectId = (state: EditBreederState) => state.id