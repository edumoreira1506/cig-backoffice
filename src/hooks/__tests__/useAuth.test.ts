import { renderHook } from '@testing-library/react-hooks'
import jwt from 'jsonwebtoken'
import { BrowserRouter } from 'react-router-dom'

import useAuth from '../useAuth'

describe('useAuth', () => {
  it('decoded the token from local storage', () => {
    const token = 'token'

    window.localStorage.setItem('token', token)

    const mockDecode = jest.fn().mockReturnValue(token)

    jest.spyOn(jwt, 'decode').mockImplementation(mockDecode)

    renderHook(() => useAuth(), { wrapper: BrowserRouter })

    expect(mockDecode).toHaveBeenCalledWith(token)
  })

  it('returns the token and user data', () => {
    const token = 'token'
    const userData = {}

    window.localStorage.setItem('token', token)

    const mockDecode = jest.fn().mockReturnValue(userData)

    jest.spyOn(jwt, 'decode').mockImplementation(mockDecode)

    const { result } = renderHook(() => useAuth(), { wrapper: BrowserRouter })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.token).toBe(token)
    expect(result.current.userData).toBe(userData)
  })

  it('returns is not authenticated when has no token in local storage', () => {
    window.localStorage.removeItem('token')

    const { result } = renderHook(() => useAuth(), { wrapper: BrowserRouter })

    expect(result.current.isAuthenticated).toBe(false)
  })
})
