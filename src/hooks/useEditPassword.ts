import { useCallback } from 'react'

import { setError } from '../contexts/AppContext/appActions'
import useAuth from './useAuth'
import authBffClient from '../services/AuthBffService'
import { useAppDispatch } from '../contexts/AppContext/AppContext'

export default function useEditPassword({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useAppDispatch()

  const { token } = useAuth()

  const handleEditPassword = useCallback(async (password: string, confirmPassword: string) => {
    try {
      await authBffClient.editPassword(password, confirmPassword, token)

      onSuccess()
    } catch(error) {
      dispatch(setError(error))
    }
  }, [token, onSuccess, dispatch])

  return handleEditPassword
}
