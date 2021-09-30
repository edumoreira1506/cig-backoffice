import React, { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render as rtlRender, screen } from '@testing-library/react'
import { breederFactory } from '@cig-platform/factories'

import * as actions from '../../../contexts/BreederContext/breederActions'
import * as useAuth from '../../../hooks/useAuth'
import Container from '../Container'
import { LOGIN_URL } from '../../../constants/url'

const DEFAULT_PROPS = {
  children: 'I am the children!'
}


const render = (children: ReactNode) => rtlRender(
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Container', () => {
  it('renders the children', () => {
    const children = 'Children'

    render(
      <Container {...DEFAULT_PROPS}>
        {children}
      </Container>
    )

    expect(screen.getByText(children)).toBeInTheDocument()
  })

  it('calls setBreeders and setSelected when renders the component', () => {
    const userData = {
      breeders: [breederFactory()]
    }
    const mockSetBreeders = jest.fn()
    const mockSetSelected = jest.fn()
    const mockUseAuth = jest.fn().mockReturnValue({ userData })

    jest.spyOn(actions, 'setBreeders').mockImplementation(mockSetBreeders)
    jest.spyOn(actions, 'setSelected').mockImplementation(mockSetSelected)
    jest.spyOn(useAuth, 'default').mockImplementation(mockUseAuth)
  
    render(<Container {...DEFAULT_PROPS} />)

    expect(mockUseAuth).toHaveBeenCalled()
    expect(mockSetBreeders).toHaveBeenCalledWith(userData.breeders)
    expect(mockSetSelected).toHaveBeenCalledWith(userData.breeders[0].id)
  })

  it.only('redirects to login page when is not authenticated', () => {
    const mockUseAuth = jest.fn().mockReturnValue({ isAuthenticated: false })

    jest.spyOn(useAuth, 'default').mockImplementation(mockUseAuth)

    const mockAssign = jest.fn()

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: mockAssign }
    })

    render(<Container {...DEFAULT_PROPS} />)

    expect(mockAssign).toHaveBeenCalledWith(LOGIN_URL)
  })
})
