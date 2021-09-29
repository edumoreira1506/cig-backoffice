import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { INITIAL_STATE, EditBreederState } from '../contexts/EditBreederContext/editBreederReducer'
import EditBreederContext from '../contexts/EditBreederContext/EditBreederContext'

export const createEditBreederContextRenderer = (mockStore: EditBreederState = INITIAL_STATE, mockDispatch = jest.fn()) => {
  return (children: ReactNode) => render(
    <EditBreederContext.Provider value={{ ...mockStore, dispatch: mockDispatch }}>
      {children}
    </EditBreederContext.Provider>
  )
}

export const createEditBreederContextHookRenderer = (mockStore: EditBreederState = INITIAL_STATE, mockDispatch = jest.fn()) => {
  const Provider = ({ children }: { children: ReactNode}) => (
    <EditBreederContext.Provider value={{ ...mockStore, dispatch: mockDispatch }}>
      {children}
    </EditBreederContext.Provider>
  )

  return (hook: any) => renderHook(hook, { wrapper: Provider })
}
