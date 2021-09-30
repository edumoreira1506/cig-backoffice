import { renderHook } from '@testing-library/react-hooks'

import AuthBffService from '../../services/AuthBffService'

import useRefreshToken from '../useRefreshToken'

describe('useRefreshToken', () => {
  it('sets the token on local storage when get an valid response', () => {
    const token = 'token'
    const newToken = 'new-token'
    const mockRefreshToken = jest.fn().mockResolvedValue({ ok: true, token: newToken })

    jest.spyOn(AuthBffService, 'refreshToken').mockImplementation(mockRefreshToken)

    const { result } = renderHook(() => useRefreshToken(token))

    result.current()

    expect(mockRefreshToken).toHaveBeenCalledWith(token)
  })
})
