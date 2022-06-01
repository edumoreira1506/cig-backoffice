import { useCallback } from 'react'

import { setError } from '../contexts/AppContext/appActions'
import useAuth from './useAuth'
import authBffClient from '../services/AuthBffService'
import { useAppDispatch } from '../contexts/AppContext/AppContext'
import { IUser } from '@cig-platform/types'

export default function useEditProfile({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useAppDispatch()

  const { token } = useAuth()

  const handleEditProfile = useCallback(async ({
    birthDate,
    email,
    name,
    register
  }: Partial<IUser>) => {
    try {
      await authBffClient.editProfile({
        birthDate,
        email,
        name,
        register
      }, token)

      onSuccess()
    } catch(error) {
      dispatch(setError(error))
    }
  }, [token, onSuccess, dispatch])

  return handleEditProfile
}
