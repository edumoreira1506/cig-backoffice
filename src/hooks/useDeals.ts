import { useCallback, useEffect, useState } from 'react'
import { IAdvertising, IBreeder, IDeal, IPoultry, IPoultryRegister } from '@cig-platform/types'

import { setError, setIsLoading } from '../contexts/AppContext/appActions'
import { useAppDispatch, useAppSelector } from '../contexts/AppContext/AppContext'
import { selectIsLoading } from '../contexts/AppContext/appSelectors'
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
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)

  const { token } = useAuth()

  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(selectIsLoading)

  const breeder = useBreeder()

  const handlePaginate = useCallback(() => {
    const documentHeight = document.body.scrollHeight
    const currentScroll = window.scrollY + window.innerHeight
    const modifier = 200 
    
    if (currentScroll + modifier > documentHeight && page < totalPages - 1 && !isLoading) {
      setPage(page + 1)
      dispatch(setIsLoading(true))
    }
  }, [page, totalPages, isLoading])

  useEffect(() => {
    if (!token || !breeder) return

    (async () => {
      try {
        dispatch(setIsLoading(true))

        const { deals, pages } = await BackofficeBffService.getDeals(breeder.id, token, filter, page)

        setDeals(deals)
        setTotalPages(pages)
      } catch(error) {
        dispatch(setError(error))
      } finally {
        dispatch(setIsLoading(false))
      }
      
    })()
  }, [token, filter, breeder, page, dispatch])

  useEffect(() => {
    document.addEventListener('scroll', handlePaginate)

    return () => document.removeEventListener('scroll', handlePaginate)
  }, [handlePaginate])

  return deals
}
