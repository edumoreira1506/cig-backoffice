import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '../contexts/AppContext/AppContext'
import { setError, setIsLoading } from '../contexts/AppContext/appActions'
import BackofficeBffService from '../services/BackofficeBffService'
import { info } from 'utils/alert'
import useBreeder from 'hooks/useBreeder'

import useAuth from './useAuth'

export default function useKillPoultry({
  onSuccess,
  poultryId,
}: {
  onSuccess: () => void;
  poultryId: string;
}) {
  const { t } = useTranslation()

  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleKillPoultry = useCallback(async () => {
    info(
      t('confirm-kill-poultry'),
      t,
      async () => {
        if (!breeder) return

        try {
          appDispatch(setIsLoading(true))
    
          await BackofficeBffService.killPoultry(breeder.id, poultryId, token)
      
          onSuccess()
        } catch (error) {
          appDispatch(setError(error))
        } finally {
          appDispatch(setIsLoading(false))
        }
      }
    )
  }, [onSuccess, appDispatch, token, t, poultryId, breeder])

  return handleKillPoultry
}
