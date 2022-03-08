import React, { useCallback, VFC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PoultryCard } from '@cig-platform/ui'

import useDeals from '../../hooks/useDeals'
import { dealToPoultryCard } from '../../formatters/dealToPoultryCard'
import PageTitle from '../../components/PageTitle/PageTitle'
import { Routes } from '../../constants/routes'

import {
  StyledContainer,
  StyledItem,
  StyledItems,
  StyledEmptyState
} from './Purchases.styles'

const Purchases: VFC = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const deals = useDeals({ filter: 'BUYER' })

  const poultryCards = useMemo(() => deals.map(dealToPoultryCard), [deals])

  const handleViewDeal = useCallback((dealId) => {
    navigate(Routes.Purchase.replace(':dealId', dealId))
  }, [navigate])

  return (
    <StyledContainer>
      <PageTitle>
        {t('purchases')}
      </PageTitle>
      <StyledItems>
        {poultryCards.map((deal, index) => (
          <StyledItem key={deals[index].deal.id} onClick={() => handleViewDeal(deals[index].deal.id)}>
            <PoultryCard {...deal} />
          </StyledItem>
        ))}
      </StyledItems>

      {Boolean(!poultryCards?.length) && (
        <StyledEmptyState>
          {t('empty-text.purchases')}
        </StyledEmptyState>
      )}
    </StyledContainer>
  )
}

export default Purchases
