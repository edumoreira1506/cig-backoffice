import { useCallback } from 'react'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'

import useBreeder from './useBreeder'
import useAuth from './useAuth'

export default function useRemovePoultryAdvertising({
  poultryId,
  onSuccess,
  advertisingId
}: {
  poultryId: string;
  onSuccess: () => void;
  advertisingId: string;
}) {
  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleRemovePoultryAdvertising = useCallback(async () => {
    if (!breeder) return

    try {
      appDispatch(setIsLoading(true))

      await BackofficeBffService.removeAdvertising(breeder.id, poultryId, advertisingId, token)
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, breeder, token, poultryId, advertisingId])

  return handleRemovePoultryAdvertising
}
