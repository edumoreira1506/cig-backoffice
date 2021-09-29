import createReducableContext from '@cig-platform/context'

import breederReducer, { INITIAL_STATE, BreederState, BreederActionTypes } from './breederReducer'

const { context, useDispatch, useSelector, provider } = createReducableContext<BreederState, BreederActionTypes>(INITIAL_STATE, breederReducer)

export default context

export const useBreederDispatch = useDispatch

export const useBreederSelector = useSelector

export const BreederProvider = provider
