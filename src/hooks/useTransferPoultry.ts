import { useCallback } from 'react'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'

import useBreeder from './useBreeder'
import useAuth from './useAuth'

export default function useTransferPoultry({
  onSuccess,
  poultryId
}: {
  onSuccess: () => void;
  poultryId: string;
}) {
  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleTransferPoultry = useCallback(async (targetBreederId: string) => {
    if (!breeder) return

    try {
      appDispatch(setIsLoading(true))

      await BackofficeBffService.transferPoultry(
        breeder.id,
        poultryId,
        targetBreederId,
        token
      )
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, breeder, token, poultryId])

  return handleTransferPoultry
}
