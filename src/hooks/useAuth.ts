import { useMemo } from 'react'
import jwt from 'jsonwebtoken'
import { useLocalStorage } from '@cig-platform/hooks'

import { IDecodedToken } from '../@types/token'
import useQueryParam from './useQueryParam'



export default function useAuth() {
  const { value } = useQueryParam('token')
  const { get } = useLocalStorage('token')

  const { token, isAuthenticated, userData } = useMemo(() => {
    try {
      const localStorageToken = value || get()

      const decodedToken = jwt.decode(localStorageToken) as IDecodedToken
  
      return {
        token: localStorageToken,
        isAuthenticated: Boolean(localStorageToken),
        userData: decodedToken
      }
    } catch {
      return {
        token: null,
        isAuthenticated: false,
        userData: null
      }
    }
  }, [get, value])

  return { token, isAuthenticated, userData }
}
