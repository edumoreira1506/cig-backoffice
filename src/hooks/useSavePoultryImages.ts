import { useCallback } from 'react'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'
import { PoultryState } from 'contexts/PoultryContext/poultryReducer'

import useBreeder from './useBreeder'
import useAuth from './useAuth'

export default function useSavePoultryimages({ onSuccess, poultryId }: { onSuccess: () => void; poultryId: string; }) {
  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleSavePoultryImages = useCallback(async (images: PoultryState['images'] = []) => {
    if (!breeder || !poultryId || !images?.length) return

    try {
      appDispatch(setIsLoading(true))

      const newImages = (images?.filter(image => image.isNew && image.raw).map(image => image.raw) ?? []) as File[]
      const removedImageIds = images?.filter(image => image.isDeleted).map(image => image.id) ?? []

      await BackofficeBffService.updatePoultry(
        breeder.id,
        poultryId,
        token,
        {},
        newImages,
        removedImageIds
      )
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, breeder, token, poultryId])

  return handleSavePoultryImages
}
