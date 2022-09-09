import { IAdvertising, IPoultry, IPoultryImage, IPoultryRegister } from '@cig-platform/types'
import { useQuery } from 'react-query'

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

  const { data, refetch, isLoading } = useQuery<Data>(
    ['getPoultryAdvertising', breeder?.id, poultryId, token],
    () => BackofficeBffService.getPoultry(breeder?.id ?? '', poultryId, token),
    {
      enabled: Boolean(token && poultryId && breeder?.id),
    }
  )
  
  return { advertising: data?.advertisings?.[0], refetch, isLoading }
}
