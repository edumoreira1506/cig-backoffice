import React from 'react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'

import { INITIAL_STATE } from '../../../contexts/EditBreederContext/editBreederReducer'
import { createEditBreederContextRenderer } from '../../../utils/test'
import * as actions from '../../../contexts/EditBreederContext/editBreederActions'

import EditBreederFormMainVideo from '../EditBreederFormMainVideo'

describe('EditBreederFormMainVideo', () => {
  it('renders correctly', () => {
    const mockStore = {
      ...INITIAL_STATE,
      mainVideo: 'https://www.youtube.com/watch?v=YAe1V7Dwf84'
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormMainVideo />)

    expect(screen.getByDisplayValue(mockStore.mainVideo)).toBeInTheDocument()
  })

  it('calls setMainVideo when input value changes', () => {
    const mainVideo = 'a'
    const mockSetMainVideo = jest.fn()

    jest.spyOn(actions, 'setMainVideo').mockImplementation(mockSetMainVideo)

    const render = createEditBreederContextRenderer()

    render(<EditBreederFormMainVideo />)

    userEvent.type(screen.getByDisplayValue(''), mainVideo)

    expect(mockSetMainVideo).toHaveBeenCalledWith(mainVideo)
  })

  it('renders the player', () => {
    const mockStore = {
      ...INITIAL_STATE,
      mainVideo: 'https://www.youtube.com/watch?v=YAe1V7Dwf84'
    }
    const render = createEditBreederContextRenderer(mockStore)

    render(<EditBreederFormMainVideo />)

    expect(screen.getByTestId('player')).toBeInTheDocument()
  })

  it('does not render the player', () => {
    const render = createEditBreederContextRenderer()

    render(<EditBreederFormMainVideo />)

    expect(screen.queryByTestId('player')).not.toBeInTheDocument()
  })
})
