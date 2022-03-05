import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { IDeal } from '@cig-platform/types'

import { useAppDispatch } from '../contexts/AppContext/AppContext'
import { setError, setIsLoading } from '../contexts/AppContext/appActions'
import { withInput } from '../utils/alert'
import MarketplaceBffService from '../services/MarketpalceBffService'

import useAuth from './useAuth'

export default function useReBuy({
  onSuccess,
}: {
  onSuccess: (deal: IDeal) => void;
}) {
  const { t } = useTranslation()

  const appDispatch = useAppDispatch()

  const { token } = useAuth()

  const handleOnChangeInputAlert = useCallback(() => {
    const inputElement = document.querySelector('.swal2-input') as HTMLInputElement

    if (!inputElement) return

    const typed = inputElement.value
    const numbers = typed.replace(/[^0-9]/g,'')

    if (typed.includes('R')) {
      inputElement.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(numbers) / 100)
    } else {
      inputElement.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(numbers))
    }
  }, [])

  const handleReBuy = useCallback(async ({
    breederId,
    poultryId,
    advertisingId,
  }: {
    breederId: string;
    advertisingId: string;
    poultryId: string;
  }) => {
    withInput(
      t('confirm-deal-value'),
      t,
      async (rawValue) => {
        const value = Number(rawValue.replace(/[^0-9]/g,''))

        document.querySelector('.swal2-input')?.removeEventListener('keyup', handleOnChangeInputAlert)

        withInput(
          t('confirm-deal-description'),
          t,
          async (description = '') => {
            try {
              appDispatch(setIsLoading(true))

              const deal = await MarketplaceBffService.postDeal(
                breederId,
                poultryId,
                advertisingId,
                token,
                { value, description }
              )

              onSuccess(deal)
            } catch (error) {
              appDispatch(setError(error))
            } finally {
              appDispatch(setIsLoading(false))
            }
          },
        )
      },
    )

    document.querySelector('.swal2-input')?.addEventListener('keyup', handleOnChangeInputAlert)
  }, [onSuccess, appDispatch, token, t])

  return handleReBuy
}
