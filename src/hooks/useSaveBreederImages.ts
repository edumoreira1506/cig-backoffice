import { useCallback } from 'react'

import BackofficeBffService from '../services/BackofficeBffService'
import { useEditBreederDispatch, useEditBreederSelector } from '../contexts/EditBreederContext/EditBreederContext'
import { setIsLoading } from '../contexts/EditBreederContext/editBreederActions'
import { setError } from '../contexts/AppContext/appActions'
import { selectId } from '../contexts/EditBreederContext/editBreederSelectors'
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken'
import { useAppDispatch } from '../contexts/AppContext/AppContext'
import { EditBreederImage } from 'contexts/EditBreederContext/editBreederReducer'

export default function useSaveBreederImages({ onSuccess }: { onSuccess: () => void }) {
  const editBreederDispatch = useEditBreederDispatch()
  const appDispatch = useAppDispatch()

  const breederId = useEditBreederSelector(selectId)

  const { token } = useAuth()

  const refreshToken = useRefreshToken(token)

  const handleSaveBreederImages = useCallback(async (images: EditBreederImage[]) => {
    editBreederDispatch(setIsLoading(true))
    appDispatch(setIsLoading(true))

    const newImages = (images?.filter(image => image.isNew && image.raw).map(image => image.raw) ?? []) as File[]
    const removedImageIds = images?.filter(image => image.isDeleted).map(image => image.id) ?? []

    try {
      await BackofficeBffService.updateBreeder(
        breederId,
        token,
        {},
        newImages,
        removedImageIds,
      )

      refreshToken()
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      editBreederDispatch(setIsLoading(false))
      appDispatch(setIsLoading(false))
    }
  }, [token, onSuccess, breederId, editBreederDispatch, appDispatch, refreshToken])

  return handleSaveBreederImages
}
