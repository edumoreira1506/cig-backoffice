import { IAdvertising, IDeal, IPoultry } from '@cig-platform/types'
import { useEffect, useState } from 'react'

import BackofficeBffService from '../services/BackofficeBffService'
import useAuth from './useAuth'
import useBreeder from './useBreeder'

type UseDealsOptions = {
  filter: 'SELLER'| 'BUYER';
}

type Deal = {
  poultry: IPoultry;
  advertising: IAdvertising;
  deal: IDeal;
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
