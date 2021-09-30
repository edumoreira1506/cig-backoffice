import { useMemo } from 'react'
import jwt from 'jsonwebtoken'
import { useLocalStorage } from '@cig-platform/hooks'

import { IDecodedToken } from '../@types/token'



export default function useAuth() {
  const { get } = useLocalStorage('token')

  const { token, isAuthenticated, userData } = useMemo(() => {
    const localStorageToken = get()

    const decodedToken = jwt.decode(localStorageToken) as IDecodedToken

    return {
      token: localStorageToken,
      isAuthenticated: Boolean(localStorageToken),
      userData: decodedToken
    }
  }, [get])

  return { token, isAuthenticated, userData }
}
