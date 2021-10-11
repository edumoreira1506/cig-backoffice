import React from 'react'
import { screen } from '@testing-library/react'

import { createEditBreederContextRenderer } from '../../../utils/test'
import EditBreederFormSubmitButton from '../EditBreederFormSubmitButton'
import { INITIAL_STATE } from '../../../contexts/EditBreederContext/editBreederReducer'
import userEvent from '@testing-library/user-event'

const DEFAULT_PROPS = {
  onSubmit: jest.fn()
}

describe('EditBreederFormSubmitButton', () => {
  it('renders correctly', () => {
    const render = createEditBreederContextRenderer()

    render(<EditBreederFormSubmitButton {...DEFAULT_PROPS} />)

    expect(screen.getByText('Salvar')).toBeInTheDocument()
  })

  it('calls onSubmit', () => {
    const onSubmit = jest.fn()

    const render = createEditBreederContextRenderer()

    render(<EditBreederFormSubmitButton {...DEFAULT_PROPS} onSubmit={onSubmit} />)

    userEvent.click(screen.getByText('Salvar'))

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: INITIAL_STATE.name,
      description: INITIAL_STATE.description,
      address: INITIAL_STATE.address,
      mainVideo: INITIAL_STATE.mainVideo,
    }))
  })
})
