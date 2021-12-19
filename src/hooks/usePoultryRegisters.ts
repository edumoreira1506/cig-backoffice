import { useEffect, useState } from 'react'
import { IPoultryRegister } from '@cig-platform/types'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setError, setIsLoading } from 'contexts/AppContext/appActions'

import useBreeder from './useBreeder'
import useAuth from './useAuth'
import BackofficeBffService from 'services/BackofficeBffService'

interface UsePoultryRegistersOptions {
  poultryId: string;
  registerType: string;
}

export default function usePoultryRegisters({
  poultryId,
  registerType
}: UsePoultryRegistersOptions) {
  const [registers, setRegisters] = useState<IPoultryRegister[]>([])

  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  useEffect(() => {
    (async () => {
      if (!breeder) return

      try {
        appDispatch(setIsLoading(true))

        const { data } = await BackofficeBffService.getRegisters(breeder.id, poultryId, token, registerType)

        setRegisters(data.registers)
      } catch (error) {
        appDispatch(setError(error))
      } finally {
        appDispatch(setIsLoading(false))
      }
    })()
  }, [appDispatch, breeder, poultryId, token, registerType])

  return registers
}
