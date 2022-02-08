import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '../contexts/AppContext/AppContext'
import { setError, setIsLoading } from '../contexts/AppContext/appActions'
import BackofficeBffService from '../services/BackofficeBffService'

import useAuth from './useAuth'
import { info } from 'utils/alert'

export default function useConfirmDeal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation()

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
    info(
      t('confirm-deal'),
      t,
      async () => {
        try {
          appDispatch(setIsLoading(true))
    
          await BackofficeBffService.confirmDeal(
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
      }
    )
  }, [onSuccess, appDispatch, token, t])

  return handleFinishDeal
}
