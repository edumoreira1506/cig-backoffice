import { useCallback, useEffect, useState } from 'react'
import { IAdvertising, IBreeder, IDeal, IPoultry, IPoultryRegister } from '@cig-platform/types'

import { setIsLoading } from '../contexts/AppContext/appActions'
import { useAppDispatch, useAppSelector } from '../contexts/AppContext/AppContext'
import { selectIsLoading } from '../contexts/AppContext/appSelectors'
import BackofficeBffService from '../services/BackofficeBffService'

import useAuth from './useAuth'
import useBreeder from './useBreeder'
import { useData } from '@cig-platform/data-helper'

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

type Data = {
  deals: {
    poultry: IPoultry;
    advertising: IAdvertising;
    deal: IDeal;
    breeder: IBreeder;
    measurementAndWeight: IPoultryRegister[];
    mainImage?: string;
  }[];
  pages: number;
  ok: true;
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
    document.addEventListener('scroll', handlePaginate)

    return () => document.removeEventListener('scroll', handlePaginate)
  }, [handlePaginate])

  const { data, isLoading: isLoadingGetDealsRequest } = useData<Data>(
    'getDeals', 
    () => BackofficeBffService.getDeals(breeder?.id ?? '', token, filter, page),
    [
      breeder?.id,
      token,
      filter,
      ...(page ? [page] : [])
    ],
    {}
  )

  useEffect(() => {
    if (!data?.deals?.length) return

    setDeals(prevDeals => [
      ...prevDeals,
      ...data?.deals?.filter(a =>
        prevDeals.every(pA => pA.deal.id !== a.deal.id)
      ) ?? []
    ])
  }, [data?.deals])

  useEffect(() => {
    dispatch(setIsLoading(isLoadingGetDealsRequest))
  }, [isLoadingGetDealsRequest, dispatch])

  useEffect(() => {
    setTotalPages(data?.pages ?? 0)
  }, [data?.pages])

  return deals
}
