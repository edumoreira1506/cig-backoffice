import React, { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
import { Link } from 'react-router-dom'

type LinkComponentProps = {
  identifier: string;
  params?: {
    poultryId?: string
  };
  children?: ReactNode
}

export default function ListPoultriesPage() {
  const { t } = useTranslation()

  const breeder = useBreeder()

  const microFrontendParams = useMemo(() => ({
    breederId: breeder?.id ?? '',
    linkComponent: ({ children, params }: LinkComponentProps) => (
      <a href={Routes.ViewPoultry.replace(':poultryId', params?.poultryId ?? '')}>
        {children}
      </a>
    ) as any
  }), [breeder?.id])

  if (!breeder?.id) return null

  return (
    <Main>
      <PageTitle>
        {t('list-poultries')}
      </PageTitle>
      <StyledNewPoultry>
        <Button onClick={() => null} type="button">
          <Link to={Routes.NewPoultry}>
            {t('create-poultry')}
          </Link>
        </Button>
      </StyledNewPoultry>
      
      <StyledPoultries id="poultry-carousels">
        <MicroFrontend
          params={microFrontendParams}
          name="BreederPoultriesPage"
          host={POULTRY_CAROUSELS_PAGE_URL}
          containerId="poultry-carousels"
        />
      </StyledPoultries>
    </Main>
  )
}
