import React from 'react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'

import { INITIAL_STATE } from '../../../contexts/EditBreederContext/editBreederReducer'
import { createEditBreederContextRenderer } from '../../../utils/test'
import * as actions from '../../../contexts/EditBreederContext/editBreederActions'

import EditBreederFormDescription from '../EditBreederFormDescription'

describe('EditBreederFormDescription', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      description: 'I am the description'
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormDescription />)

    expect(screen.getByDisplayValue(mockStore.description)).toBeInTheDocument()
  })

  it('calls setDescription when input value changes', () => {
    const description = '1'
    const mockSetDescription = jest.fn()

    jest.spyOn(actions, 'setDescription').mockImplementation(mockSetDescription)

    const render = createEditBreederContextRenderer()

    render(<EditBreederFormDescription />)

    userEvent.type(screen.getByDisplayValue(''), description)

    expect(mockSetDescription).toHaveBeenCalledWith(description)
  })
})
