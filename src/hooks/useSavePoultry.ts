import { useCallback } from 'react'
import { IPoultry } from '@cig-platform/types'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { filterObject } from 'utils/object'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'

import useBreeder from './useBreeder'
import useAuth from './useAuth'

export default function useSavePoultry({ onSuccess }: { onSuccess: () => void }) {
  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleSavePoultry = useCallback(async (poultry: Partial<IPoultry>) => {
    if (!breeder) return

    try {
      appDispatch(setIsLoading(true))

      await BackofficeBffService.postPoultry(breeder.id, token, filterObject(poultry))
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, breeder, token])

  return handleSavePoultry
}
