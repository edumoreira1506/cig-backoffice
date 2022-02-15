import { useCallback } from 'react'
import { IPoultry } from '@cig-platform/types'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { filterObject } from 'utils/object'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'

import useBreeder from './useBreeder'
import useAuth from './useAuth'
import { PoultryState } from 'contexts/PoultryContext/poultryReducer'

export default function useSavePoultry({ onSuccess }: { onSuccess: () => void }) {
  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleSavePoultry = useCallback(async (poultry: Partial<IPoultry> & { images?: PoultryState['images']; weight?: number; measurement?: number; }) => {
    if (!breeder) return

    try {
      appDispatch(setIsLoading(true))

      const images = (poultry.images ?? []).map(image => image.raw) as File[]

      delete poultry['images']

      await BackofficeBffService.postPoultry(
        breeder.id,
        token,
        filterObject(poultry),
        images,
        { measurement: poultry.measurement, weight: poultry.weight }
      )
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, breeder, token])

  return handleSavePoultry
}
