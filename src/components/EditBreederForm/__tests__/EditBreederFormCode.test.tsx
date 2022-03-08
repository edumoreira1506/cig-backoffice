import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { INITIAL_STATE } from '../../../contexts/EditBreederContext/editBreederReducer'
import { createEditBreederContextRenderer } from '../../../utils/test'
import * as actions from '../../../contexts/EditBreederContext/editBreederActions'

import EditBreederFormCode from '../EditBreederFormCode'

describe('EditBreederFormCode', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      code: 'ABCD'
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormCode />)

    expect(screen.getByDisplayValue(mockStore.code)).toBeInTheDocument()
  })

  it('do nothing on change', () => {
    const code = 'A'
    const mockSetCode = jest.fn()

    jest.spyOn(actions, 'setCode').mockImplementation(mockSetCode)

    const render = createEditBreederContextRenderer({
      ...INITIAL_STATE,
      code: ''
    })

    render(<EditBreederFormCode />)

    userEvent.type(screen.getByDisplayValue(''), code)

    expect(mockSetCode).not.toHaveBeenCalled()
  })
})
