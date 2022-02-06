import { useCallback } from 'react'

import { useAppDispatch } from '../contexts/AppContext/AppContext'
import { setError, setIsLoading } from '../contexts/AppContext/appActions'
import BackofficeBffService from '../services/BackofficeBffService'

import useAuth from './useAuth'

export default function useCancelDeal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const appDispatch = useAppDispatch()

  const { token } = useAuth()

  const handleCancelDeal = useCallback(async ({
    breederId,
    poultryId,
    advertisingId,
    dealId,
    reason
  }: {
    dealId: string;
    breederId: string;
    advertisingId: string;
    poultryId: string;
    reason: string;
  }) => {
    try {
      appDispatch(setIsLoading(true))

      await BackofficeBffService.cancelDeal(
        breederId,
        poultryId,
        advertisingId,
        dealId,
        token,
        reason
      )
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, token])

  return handleCancelDeal
}
