import { useCallback } from 'react'
import { useParams } from 'react-router'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'

import useAuth from './useAuth'
import { useBreederSelector } from 'contexts/BreederContext/BreederContext'
import { selectSelectedBreeder } from 'contexts/BreederContext/breederSelectors'

export default function useSaveReview({ onSuccess }: { onSuccess: () => void; }) {
  const appDispatch = useAppDispatch()

  const { dealId } = useParams<{ dealId: string }>()

  const { token } = useAuth()

  const selectedBreeder = useBreederSelector(selectSelectedBreeder)

  const handleSaveReview = useCallback(async (dealFeedback: string, merchantFeedback: string, score: number) => {
    if (!selectedBreeder?.id || !dealId) return

    try {
      appDispatch(setIsLoading(true))

      const { poultry, advertising } = await BackofficeBffService.getDeal(selectedBreeder.id, dealId, token)

      await BackofficeBffService.postReview(selectedBreeder.id, poultry.id, advertising.id, dealId, token, {
        dealFeedback,
        merchantFeedback,
        score
      })
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, token, selectedBreeder?.id, dealId])

  return handleSaveReview
}
