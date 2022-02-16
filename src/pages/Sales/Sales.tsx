import React, { useCallback, VFC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PoultryCard } from '@cig-platform/ui'
import { useHistory } from 'react-router-dom'

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

  const history = useHistory()

  const deals = useDeals({ filter: 'SELLER' })

  const poultryCards = useMemo(() => deals.map(dealToPoultryCard), [deals])

  const handleViewDeal = useCallback((dealId) => {
    history.push(Routes.Sale.replace(':dealId', dealId))
  }, [history])

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
