import { useEffect, useMemo } from 'react'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setIsLoading } from 'contexts/AppContext/appActions'

import useBreeder from './useBreeder'
import useAuth from './useAuth'
import BackofficeBffService from 'services/BackofficeBffService'
import { useQuery } from 'react-query'
import { IPoultryRegister } from '@cig-platform/types'
import { AxiosResponse } from 'axios'

interface UsePoultryRegistersOptions {
  poultryId: string;
  registerType: string;
}

type Data = {
  registers: IPoultryRegister[];
  ok: true;
}

export default function usePoultryRegisters({
  poultryId,
  registerType
}: UsePoultryRegistersOptions) {
  const appDispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const { isLoading, data, ...reactQueryData } = useQuery<AxiosResponse<Data>>(
    ['getPoultryRregisters', breeder?.id, poultryId, token, registerType],
    () => BackofficeBffService.getRegisters(breeder?.id ?? '', poultryId, token, registerType),
    {
      enabled: Boolean(token && poultryId && breeder?.id && registerType),
    }
  )

  useEffect(() => {
    appDispatch(setIsLoading(isLoading))
  }, [isLoading, appDispatch])

  return useMemo(() => ({
    ...reactQueryData,
    data: data?.data,
  }), [reactQueryData, data?.data])
}
