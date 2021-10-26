import createReducableContext from '@cig-platform/context'

import registerReducer, { INITIAL_STATE, RegisterState, RegisterActionTypes } from './registerReducer'

const { context, useDispatch, useSelector, provider } = createReducableContext<RegisterState, RegisterActionTypes>(INITIAL_STATE, registerReducer)

export default context

export const useRegisterDispatch = useDispatch

export const useRegisterSelector = useSelector

export const RegisterProvider = provider
