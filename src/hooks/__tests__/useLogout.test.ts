import { renderHook } from '@testing-library/react-hooks'
import { LOGIN_URL } from 'constants/url'

import useLogout from '../useLogout'

describe('useLogout', () => {
  it('clears the local storage', () => {
    const localStorageKey = 'key'
    const localStorageValue = 'value'

    window.localStorage.setItem(localStorageKey, localStorageValue)

    const { result } = renderHook(() => useLogout())

    result.current()

    expect(window.localStorage.getItem(localStorageKey)).toBeNull()
  })

  it('redirects to login page including a query param', () => {
    const mockAssign = jest.fn()

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: mockAssign }
    })

    const { result } = renderHook(() => useLogout())

    result.current()

    expect(mockAssign).toHaveBeenCalledWith(`${LOGIN_URL}?logout=true`)
  })
})
