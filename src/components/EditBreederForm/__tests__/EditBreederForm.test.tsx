import React from 'react'
import { screen } from '@testing-library/react'

import { INITIAL_STATE } from '../../../contexts/EditBreederContext/editBreederReducer'
import { createEditBreederContextRenderer } from '../../../utils/test'

import EditBreederForm from '../EditBreederForm'
import userEvent from '@testing-library/user-event'

const DEFAULT_PROPS = {
  onSubmit: jest.fn()
}

jest.mock('@cig-platform/ui', () => {
  const original = jest.requireActual('@cig-platform/ui')

  return {
    ...original,
    Input: ({ label, onChange, placeholder, value }: {
      label: string;
      onChange: (newValue: string) => void;
      placeholder: string;
      value: string;
    }) => (
      <>
        <label>{label}</label>
        <input value={value} type="text" onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </>
    )
  }
})

describe('EditBreederForm', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      name: 'New name',
      description: 'Description'
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederForm {...DEFAULT_PROPS} />)

    expect(screen.getByDisplayValue(mockStore.name)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockStore.description)).toBeInTheDocument()
  })

  it('calls onSubmit', () => {
    const render = createEditBreederContextRenderer()
    const onSubmit = jest.fn()

    render(<EditBreederForm {...DEFAULT_PROPS} onSubmit={onSubmit} />)

    userEvent.click(screen.getByText('Salvar'))

    expect(onSubmit).toHaveBeenCalled()
  })
})
