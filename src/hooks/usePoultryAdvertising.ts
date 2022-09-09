import { useData } from '@cig-platform/data-helper'
import { IAdvertising, IPoultry, IPoultryImage, IPoultryRegister } from '@cig-platform/types'

import BackofficeBffService from 'services/BackofficeBffService'
import useAuth from './useAuth'
import useBreeder from './useBreeder'

type Data = {
  poultry: IPoultry & {
    images: IPoultryImage[];
    registers: IPoultryRegister[];
  };
  advertisings: IAdvertising[];
}

export default function usePoultryAdvertising(poultryId: string) {
  const { token } = useAuth()
  
  const breeder = useBreeder()

  const { data, refetch, isLoading } = useData<Data>(
    'getPoultryAdvertising',
    () => BackofficeBffService.getPoultry(breeder?.id ?? '', poultryId, token),
    [breeder?.id, poultryId, token],
    {}
  )
  
  return { advertising: data?.advertisings?.[0], refetch, isLoading }
}
