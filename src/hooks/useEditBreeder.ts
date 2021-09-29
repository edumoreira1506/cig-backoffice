import { useCallback } from 'react'
import AuthBffClient from '@cig-platform/auth-bff-client'
import { IBreeder } from '@cig-platform/types'

import { useEditBreederDispatch, useEditBreederSelector } from '../contexts/EditBreederContext/EditBreederContext'
import { setIsLoading, setError } from '../contexts/EditBreederContext/editBreederActions'
import { AUTH_BFF_API_URL } from '../constants/url'
import { selectId } from '../contexts/EditBreederContext/editBreederSelectors'
import useAuth from './useAuth'
import { filterObject } from '../utils/object'
import { EditBreederFormProps } from 'components/EditBreederForm/EditBreederForm'

const authBffClient = new AuthBffClient(AUTH_BFF_API_URL)

export default function useEditBreeder({ onSuccess }: { onSuccess: EditBreederFormProps['onSubmit'] }) {
  const dispatch = useEditBreederDispatch()

  const breederId = useEditBreederSelector(selectId)

  const { token } = useAuth()

  const handleEditBreeder = useCallback(async (breeder: Partial<IBreeder>) => {
    dispatch(setIsLoading(true))

    const authBffResponse = await authBffClient.editBreeder(breederId, token, filterObject(breeder))

    dispatch(setIsLoading(false))

    if (!authBffResponse?.ok) {
      dispatch(setError(authBffResponse?.error))
    } else {
      onSuccess(breeder)
    }
  }, [token, onSuccess, breederId])

  return handleEditBreeder
}
