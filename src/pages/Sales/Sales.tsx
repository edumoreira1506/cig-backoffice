import React, { useCallback, VFC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PoultryCard } from '@cig-platform/ui'
import { useNavigate } from 'react-router-dom'

import useDeals from '../../hooks/useDeals'
import { dealToPoultryCard } from '../../formatters/dealToPoultryCard'
import PageTitle from '../../components/PageTitle/PageTitle'
import { Routes } from '../../constants/routes'

import {
  StyledContainer,
  StyledItem,
  StyledItems,
  StyledEmptyState
} from './Sales.styles'

const Sales: VFC = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const deals = useDeals({ filter: 'SELLER' })

  const poultryCards = useMemo(() => deals.map(dealToPoultryCard), [deals])

  const handleViewDeal = useCallback((dealId) => {
    navigate(Routes.Sale.replace(':dealId', dealId))
  }, [navigate])

  return (
    <StyledContainer>
      <PageTitle>
        {t('sales')}
      </PageTitle>
      <StyledItems>
        {poultryCards.map((deal, index) => (
          <StyledItem key={deals[index].deal.id} onClick={() => handleViewDeal(deals[index].deal.id)}>
            <PoultryCard {...deal} />
          </StyledItem>
        ))}

        {Boolean(!poultryCards?.length) && (
          <StyledEmptyState>
            {t('empty-text.sales')}
          </StyledEmptyState>
        )}
      </StyledItems>
    </StyledContainer>
  )
}

export default Sales
