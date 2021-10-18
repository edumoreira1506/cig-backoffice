import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IPoultry } from '@cig-platform/types'

import Main from '../../components/Main/Main'
import PageTitle from '../../components/PageTitle/PageTitle'
import { useAppDispatch } from '../../contexts/AppContext/AppContext'
import { setError } from '../../contexts/AppContext/appActions'
import BackofficeBffService from '../../services/BackofficeBffService'
import useBreeder from '../../hooks/useBreeder'
import useAuth from '../../hooks/useAuth'

import { StyledItem, StyledList } from './ListPoultries.styles'

export default function ListPoultriesPage() {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const breeder = useBreeder()

  const { token } = useAuth()

  const [poultries, setPoultries] = useState<IPoultry[]>([])

  useEffect(() => {
    if (!breeder) return

    (async () => {
      try {
        const newPoultries = await BackofficeBffService.getPoultries(breeder.id, token)

        setPoultries(newPoultries)
      } catch (error) {
        dispatch(setError(error))
      }
    })()
  }, [breeder])

  return (
    <Main>
      <PageTitle>
        {t('list-poultries')}
      </PageTitle>
      <StyledList>
        {poultries.map((poultry) => (
          <StyledItem key={poultry.id}>
            {poultry.id}
          </StyledItem>
        ))}
      </StyledList>
    </Main>
  )
}
