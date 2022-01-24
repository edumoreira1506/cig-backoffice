import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { Button } from '@cig-platform/ui'
import MicroFrontend from '@cig-platform/microfrontend-helper'

import Main from 'components/Main/Main'
import PageTitle from 'components/PageTitle/PageTitle'
import useBreeder from 'hooks/useBreeder'
import { Routes } from 'constants/routes'
import { POULTRY_CAROUSELS_PAGE_URL } from 'constants/url'

import {
  StyledNewPoultry,
  StyledPoultries
} from './ListPoultries.styles'

export default function ListPoultriesPage() {
  const { t } = useTranslation()

  const history = useHistory()

  const breeder = useBreeder()

  const handleNavigateToNewPoultry = useCallback(() => {
    history.push(Routes.NewPoultry)
  }, [history])

  const handleNavigateToEditPoultry = useCallback(({ poultryId }: { poultryId: string }) => {
    if (poultryId) {
      history.push(Routes.EditPoultry.replace(':poultryId', poultryId))
    }
  }, [history])

  const handleNavigateToViewPoultry = useCallback(({ poultryId }: { poultryId: string }) => {
    if (poultryId) {
      history.push(Routes.ViewPoultry.replace(':poultryId', poultryId))
    }
  }, [history])

  const microFrontendParams = useMemo(() => ({
    breederId: breeder?.id ?? ''
  }), [breeder?.id])

  const microFrontendCallbacks = useMemo<Record<string, any>>(() => ({
    onViewPoultry: handleNavigateToViewPoultry,
    onEditPoultry: handleNavigateToEditPoultry
  }), [handleNavigateToEditPoultry, handleNavigateToViewPoultry])

  if (!breeder?.id) return null

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
      
      <StyledPoultries id="poultry-carousels">
        <MicroFrontend
          params={microFrontendParams}
          name="BreederPoultriesPage"
          host={POULTRY_CAROUSELS_PAGE_URL}
          containerId="poultry-carousels"
          callbacks={microFrontendCallbacks}
        />
      </StyledPoultries>
    </Main>
  )
}
