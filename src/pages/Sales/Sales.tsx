import React, { VFC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
} from './Sales.styles'
import { Link } from 'react-router-dom'

const Sales: VFC = () => {
  const { t } = useTranslation()

  const deals = useDeals({ filter: 'SELLER' })

  const poultryCards = useMemo(() => deals.map(dealToPoultryCard), [deals])

  return (
    <StyledContainer>
      <PageTitle>
        {t('sales')}
      </PageTitle>
      <StyledItems>
        {poultryCards.map((deal, index) => (
          <Link to={Routes.Sale.replace(':dealId', deals[index].deal.id)} key={deals[index].deal.id}>
            <StyledItem>
              <PoultryCard {...deal} />
            </StyledItem>
          </Link>
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
