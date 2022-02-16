import { IAdvertising, IBreeder, IDeal, IPoultry, IPoultryRegister } from '@cig-platform/types'
import { useEffect, useState } from 'react'

import BackofficeBffService from '../services/BackofficeBffService'
import useAuth from './useAuth'
import useBreeder from './useBreeder'

type UseDealsOptions = {
  filter: 'SELLER'| 'BUYER';
}

export type Deal = {
  poultry: IPoultry;
  advertising: IAdvertising;
  deal: IDeal;
  breeder: IBreeder;
  measurementAndWeight: IPoultryRegister[];
  mainImage?: string;
}

export default function useDeals({ filter }: UseDealsOptions) {
  const [deals, setDeals] = useState<Deal[]>([])

  const { token } = useAuth()

  const breeder = useBreeder()

  useEffect(() => {
    if (!token || !breeder) return

    (async () => {
      const deals = await BackofficeBffService.getDeals(breeder.id, token, filter)

      setDeals(deals)
    })()
  }, [token, filter, breeder])

  return deals
}
