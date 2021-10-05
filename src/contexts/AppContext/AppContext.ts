import createReducableContext from '@cig-platform/context'

import appReducer, { INITIAL_STATE, AppState, AppActionTypes } from './appReducer'

const { context, useDispatch, useSelector, provider } = createReducableContext<AppState, AppActionTypes>(INITIAL_STATE, appReducer)

export default context

export const useAppDispatch = useDispatch

export const useAppSelector = useSelector

export const AppProvider = provider
