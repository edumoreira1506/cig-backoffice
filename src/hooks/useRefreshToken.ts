import { useCallback } from 'react'
import { useLocalStorage } from '@cig-platform/hooks'

import AuthBffService from '../services/AuthBffService'

export default function useRefreshToken(token: string) {
  const { set } = useLocalStorage('token')

  const refreshToken = useCallback(async () => {
    try {
      const newToken = await AuthBffService.refreshToken(token)

      if (newToken?.ok) set(newToken.token)
    } catch {
      console.log('Error refreshing token')
    }
  }, [token, set])

  return refreshToken
}
