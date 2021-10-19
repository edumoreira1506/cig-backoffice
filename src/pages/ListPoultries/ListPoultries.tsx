import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { IPoultry } from '@cig-platform/types'
import { Button } from '@cig-platform/ui'

import Main from 'components/Main/Main'
import PageTitle from 'components/PageTitle/PageTitle'
import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setError } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'
import useBreeder from 'hooks/useBreeder'
import useAuth from 'hooks/useAuth'
import { Routes } from 'constants/routes'

import { StyledItem, StyledList, StyledNewPoultry } from './ListPoultries.styles'

export default function ListPoultriesPage() {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const history = useHistory()

  const breeder = useBreeder()

  const { token } = useAuth()

  const [poultries, setPoultries] = useState<IPoultry[]>([])

  const handleNavigateToNewPoultry = useCallback(() => {
    history.push(Routes.NewPoultry)
  }, [history])

  const handleNavigateToEditPoultry = (poultryId: string) => {
    history.push(Routes.EditPoultry.replace(':poultryId', poultryId))
  }

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
      <StyledNewPoultry>
        <Button onClick={handleNavigateToNewPoultry} type="button">
          {t('create-poultry')}
        </Button>
      </StyledNewPoultry>
      <StyledList>
        {poultries.map((poultry) => (
          <StyledItem key={poultry.id} onClick={() => handleNavigateToEditPoultry(poultry.id)}>
            {poultry.id}
          </StyledItem>
        ))}
      </StyledList>
    </Main>
  )
}
