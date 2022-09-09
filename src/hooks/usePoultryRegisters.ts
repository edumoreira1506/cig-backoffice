import { useEffect, useMemo } from 'react'

import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setIsLoading } from 'contexts/AppContext/appActions'

import useBreeder from './useBreeder'
import useAuth from './useAuth'
import BackofficeBffService from 'services/BackofficeBffService'
import { IPoultryRegister } from '@cig-platform/types'
import { AxiosResponse } from 'axios'
import { useData } from '@cig-platform/data-helper'

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

  const { isLoading, data, ...reactQueryData } = useData<AxiosResponse<Data>>(
    'getPoultryRregisters',
    () => BackofficeBffService.getRegisters(breeder?.id ?? '', poultryId, token, registerType),
    [breeder?.id, poultryId, token, registerType],
    {}
  )

  useEffect(() => {
    appDispatch(setIsLoading(isLoading))
  }, [isLoading, appDispatch])

  return useMemo(() => ({
    ...reactQueryData,
    data: data?.data,
  }), [reactQueryData, data?.data])
}
