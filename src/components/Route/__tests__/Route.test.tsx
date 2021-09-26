import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import * as useAuth from 'hooks/useAuth'
import { LOGIN_URL } from 'constants/url'

import Route from '../Route'

describe('Route', () => {
  it('renders the component when is authenticated', () => {
    const componentText = 'I am the component!'
    const Component = () => <div>{componentText}</div>

    const mockUseAuth = jest.fn().mockReturnValue({
      token: 'fake token',
      isAuthenticated: true,
      userData: {}
    }) as any

    jest.spyOn(useAuth, 'default').mockImplementation(mockUseAuth)

    render(<Router><Route component={Component} /></Router>)

    expect(screen.getByText(componentText)).toBeInTheDocument()
  })

  it('redirects the user when is not authenticated', () => {
    const componentText = 'I am the component!'
    const Component = () => <div>{componentText}</div>

    const mockUseAuth = jest.fn().mockReturnValue({
      token: 'fake token',
      isAuthenticated: false,
      userData: {}
    }) as any

    const mockWindowAssign = jest.fn()

    jest.spyOn(useAuth, 'default').mockImplementation(mockUseAuth)

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: mockWindowAssign }
    })

    render(<Router><Route component={Component} /></Router>)

    expect(screen.queryByText(componentText)).not.toBeInTheDocument()
    expect(mockWindowAssign).toHaveBeenCalledWith(LOGIN_URL)
  })
})
