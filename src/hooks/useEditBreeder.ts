import { useCallback } from 'react'

import backofficeBffClient from '../services/BackofficeBffService'
import { useEditBreederDispatch, useEditBreederSelector } from '../contexts/EditBreederContext/EditBreederContext'
import { setIsLoading } from '../contexts/EditBreederContext/editBreederActions'
import { setError } from '../contexts/AppContext/appActions'
import { selectId } from '../contexts/EditBreederContext/editBreederSelectors'
import useAuth from './useAuth'
import { filterObject } from '../utils/object'
import { EditBreederFormProps } from 'components/EditBreederForm/EditBreederForm'
import { BreederWithFiles } from '../@types/breeder'
import { useAppDispatch } from '../contexts/AppContext/AppContext'

export default function useEditBreeder({ onSuccess }: { onSuccess: EditBreederFormProps['onSubmit'] }) {
  const editBreederDispatch = useEditBreederDispatch()
  const appDispatch = useAppDispatch()

  const breederId = useEditBreederSelector(selectId)

  const { token } = useAuth()

  const handleEditBreeder = useCallback(async (breeder: Partial<BreederWithFiles>) => {
    editBreederDispatch(setIsLoading(true))
    appDispatch(setIsLoading(true))

    const authBffResponse = await backofficeBffClient.editBreeder(breederId, token, filterObject(breeder))

    editBreederDispatch(setIsLoading(false))
    appDispatch(setIsLoading(false))

    if (!authBffResponse?.ok) {
      appDispatch(setError(authBffResponse?.error))
    } else {
      onSuccess(breeder)
    }
  }, [token, onSuccess, breederId, editBreederDispatch, appDispatch])

  return handleEditBreeder
}
