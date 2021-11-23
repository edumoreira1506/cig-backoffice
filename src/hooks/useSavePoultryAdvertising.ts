import { useCallback } from 'react'
import { IAdvertising } from '@cig-platform/types'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'

import useBreeder from './useBreeder'
import useAuth from './useAuth'

export default function useSavePoultryAdvertising({ poultryId, onSuccess }: { poultryId: string; onSuccess: () => void }) {
  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleSavePoultryAdvertising = useCallback(async (advertising: Partial<IAdvertising>) => {
    if (!breeder) return

    try {
      appDispatch(setIsLoading(true))

      await BackofficeBffService.postAdvertising(breeder.id, poultryId, token, advertising)
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, breeder, token, poultryId])

  return handleSavePoultryAdvertising
}
