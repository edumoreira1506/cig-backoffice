import createReducableContext from '@cig-platform/context'

import poultryReducer, { INITIAL_STATE, PoultryState, PoultryActionTypes } from './poultryReducer'

const { context, useDispatch, useSelector, provider } = createReducableContext<PoultryState, PoultryActionTypes>(INITIAL_STATE, poultryReducer)

export default context

export const usePoultryDispatch = useDispatch

export const usePoultrySelector = useSelector

export const PoultryProvider = provider
