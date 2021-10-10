import { useCallback } from 'react'

import backofficeBffClient from '../services/BackofficeBffService'
import { useEditBreederDispatch, useEditBreederSelector } from '../contexts/EditBreederContext/EditBreederContext'
import { setIsLoading } from '../contexts/EditBreederContext/editBreederActions'
import { setError } from '../contexts/AppContext/appActions'
import { selectId } from '../contexts/EditBreederContext/editBreederSelectors'
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken'
import { filterObject } from '../utils/object'
import { EditBreederFormProps } from 'components/EditBreederForm/EditBreederForm'
import { BreederWithFiles } from '../@types/breeder'
import { useAppDispatch } from '../contexts/AppContext/AppContext'

export default function useEditBreeder({ onSuccess }: { onSuccess: EditBreederFormProps['onSubmit'] }) {
  const editBreederDispatch = useEditBreederDispatch()
  const appDispatch = useAppDispatch()

  const breederId = useEditBreederSelector(selectId)

  const { token } = useAuth()

  const refreshToken = useRefreshToken(token)

  const handleEditBreeder = useCallback(async (breeder: Partial<BreederWithFiles>) => {
    editBreederDispatch(setIsLoading(true))
    appDispatch(setIsLoading(true))

    const newImages = (breeder?.images?.filter(image => image.isNew && image.raw).map(image => image.raw) ?? []) as File[]
    const removedImageIds = breeder?.images?.filter(image => image.isDeleted).map(image => image.id) ?? []

    delete breeder['images']

    const authBffResponse = await backofficeBffClient.editBreeder(
      breederId,
      token,
      filterObject(breeder),
      newImages,
      removedImageIds
    )

    editBreederDispatch(setIsLoading(false))
    appDispatch(setIsLoading(false))

    if (!authBffResponse?.ok) {
      appDispatch(setError((authBffResponse as any)?.error))
    } else {
      refreshToken()
      onSuccess(breeder)
    }
  }, [token, onSuccess, breederId, editBreederDispatch, appDispatch, refreshToken])

  return handleEditBreeder
}
