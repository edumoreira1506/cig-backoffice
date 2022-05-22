import React from 'react'
import { screen } from '@testing-library/react'

import { INITIAL_STATE } from '../../../contexts/EditBreederContext/editBreederReducer'
import { createEditBreederContextRenderer } from '../../../utils/test'

import EditBreederFormFoundationDate from '../EditBreederFormFoundationDate'

describe('EditBreederFormFoundationDate', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      foundationDate: '2021-01-01'
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormFoundationDate />)

    expect(screen.getByDisplayValue(new Date(mockStore.foundationDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))).toBeInTheDocument()
  })
})
