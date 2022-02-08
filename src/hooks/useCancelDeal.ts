import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '../contexts/AppContext/AppContext'
import { setError, setIsLoading } from '../contexts/AppContext/appActions'
import BackofficeBffService from '../services/BackofficeBffService'
import { info } from '../utils/alert'

import useAuth from './useAuth'

export default function useCancelDeal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation()

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
    info(
      t('confirm-cancel-deal'),
      t,
      async () => {
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
      }
    )
  }, [onSuccess, appDispatch, token, t])

  return handleCancelDeal
}
