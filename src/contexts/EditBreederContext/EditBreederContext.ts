import createReducableContext from '@cig-platform/context'

import editBreederReducer, { INITIAL_STATE, EditBreederState, EditBreederActionTypes } from './editBreederReducer'

const { context, useDispatch, useSelector, provider } = createReducableContext<EditBreederState, EditBreederActionTypes>(INITIAL_STATE, editBreederReducer)

export default context

export const useEditBreederDispatch = useDispatch

export const useEditBreederSelector = useSelector

export const EditBreederProvider = provider
