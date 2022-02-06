import { useCallback } from 'react'

import { useAppDispatch } from '../contexts/AppContext/AppContext'
import { setError, setIsLoading } from '../contexts/AppContext/appActions'
import BackofficeBffService from '../services/BackofficeBffService'

import useAuth from './useAuth'

export default function useFinishDeal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const appDispatch = useAppDispatch()

  const { token } = useAuth()

  const handleFinishDeal = useCallback(async ({
    breederId,
    poultryId,
    advertisingId,
    dealId
  }: {
    dealId: string;
    breederId: string;
    advertisingId: string;
    poultryId: string;
  }) => {
    try {
      appDispatch(setIsLoading(true))

      await BackofficeBffService.finishDeal(
        breederId,
        poultryId,
        advertisingId,
        dealId,
        token
      )
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, token])

  return handleFinishDeal
}
