import { useCallback } from 'react'
import { useParams } from 'react-router'
import { IPoultryRegister } from '@cig-platform/types'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'

import useBreeder from './useBreeder'
import useAuth from './useAuth'

export default function useSaveRegister({ onSuccess }: { onSuccess: () => void }) {
  const appDispatch = useAppDispatch()

  const { poultryId } = useParams<{ poultryId: string }>()

  const breeder = useBreeder()

  const { token } = useAuth()

  const handleSaveRegister = useCallback(async (register: Partial<IPoultryRegister>, files: File[] = []) => {
    if (!breeder || !poultryId) return

    try {
      appDispatch(setIsLoading(true))

      await BackofficeBffService.postRegister(breeder.id, poultryId, token, register, files)
  
      onSuccess()
    } catch (error) {
      appDispatch(setError(error))
    } finally {
      appDispatch(setIsLoading(false))
    }
  }, [onSuccess, appDispatch, breeder, token, poultryId])

  return handleSaveRegister
}
