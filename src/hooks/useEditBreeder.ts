import { useCallback } from 'react'
import { IBreeder } from '@cig-platform/types'

import backofficeBffClient from '../services/BackofficeBffService'
import { useEditBreederDispatch, useEditBreederSelector } from '../contexts/EditBreederContext/EditBreederContext'
import { setIsLoading, setError } from '../contexts/EditBreederContext/editBreederActions'
import { selectId } from '../contexts/EditBreederContext/editBreederSelectors'
import useAuth from './useAuth'
import { filterObject } from '../utils/object'
import { EditBreederFormProps } from 'components/EditBreederForm/EditBreederForm'

export default function useEditBreeder({ onSuccess }: { onSuccess: EditBreederFormProps['onSubmit'] }) {
  const dispatch = useEditBreederDispatch()

  const breederId = useEditBreederSelector(selectId)

  const { token } = useAuth()

  const handleEditBreeder = useCallback(async (breeder: Partial<IBreeder>) => {
    dispatch(setIsLoading(true))

    const authBffResponse = await backofficeBffClient.editBreeder(breederId, token, filterObject(breeder))

    dispatch(setIsLoading(false))

    if (!authBffResponse?.ok) {
      dispatch(setError(authBffResponse?.error))
    } else {
      onSuccess(breeder)
    }
  }, [token, onSuccess, breederId])

  return handleEditBreeder
}
