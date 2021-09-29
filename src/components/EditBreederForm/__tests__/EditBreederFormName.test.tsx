import React from 'react'
import { screen } from '@testing-library/react'

import { INITIAL_STATE } from '../../../contexts/EditBreederContext/editBreederReducer'
import { createEditBreederContextRenderer } from '../../../utils/test'
import * as actions from '../../../contexts/EditBreederContext/editBreederActions'

import EditBreederFormName from '../EditBreederFormName'
import userEvent from '@testing-library/user-event'

describe('EditBreederFormName', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      name: 'I am the name'
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormName />)

    expect(screen.getByDisplayValue(mockStore.name)).toBeInTheDocument()
  })

  it('calls setName when input value changes', () => {
    const name = '1'
    const mockSetName = jest.fn()

    jest.spyOn(actions, 'setName').mockImplementation(mockSetName)

    const render = createEditBreederContextRenderer()

    render(<EditBreederFormName />)

    userEvent.type(screen.getByDisplayValue(''), name)

    expect(mockSetName).toHaveBeenCalledWith(name)
  })
})
