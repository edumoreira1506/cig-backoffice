import { useCallback } from 'react'
import { IPoultry } from '@cig-platform/types'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { filterObject } from 'utils/object'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'
import { PoultryState } from 'contexts/PoultryContext/poultryReducer'

import useBreeder from './useBreeder'
import useAuth from './useAuth'

export default function useEditPoultry({ onSuccess, poultryId }: { onSuccess: () => void; poultryId: string; }) {
  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleEditPoultry = useCallback(async (poultry: Partial<IPoultry> & { images?: PoultryState['images'] }) => {
    if (!breeder || !poultryId) return

    try {
      appDispatch(setIsLoading(true))

      delete poultry['images']
      delete poultry['gender']

      await BackofficeBffService.updatePoultry(
        breeder.id,
        poultryId,
        token,
        filterObject(poultry)
      )
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, breeder, token, poultryId])

  return handleEditPoultry
}
