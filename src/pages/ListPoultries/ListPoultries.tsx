import React, { ReactNode, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
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

type LinkComponentProps = {
  identifier: string;
  params?: {
    poultryId?: string
  };
  children?: ReactNode
}

export default function ListPoultriesPage() {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const breeder = useBreeder()

  const handleNavigateToNewPoultry = useCallback(() => {
    navigate(Routes.NewPoultry)
  }, [navigate])

  const handleNavigateToEditPoultry = useCallback(({ poultryId }: { poultryId: string }) => {
    if (poultryId) {
      navigate(Routes.EditPoultry.replace(':poultryId', poultryId))
    }
  }, [navigate])

  const handleNavigateToViewPoultry = useCallback(({ poultryId }: { poultryId: string }) => {
    if (poultryId) {
      navigate(Routes.ViewPoultry.replace(':poultryId', poultryId))
    }
  }, [navigate])

  const microFrontendParams = useMemo(() => ({
    breederId: breeder?.id ?? '',
    linkComponent: ({ children, params }: LinkComponentProps) => (
      <a href={Routes.ViewPoultry.replace(':poultryId', params?.poultryId ?? '')}>
        {children}
      </a>
    ) as any
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
