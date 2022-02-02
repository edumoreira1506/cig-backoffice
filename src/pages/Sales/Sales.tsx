import React, { useCallback, VFC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DealInfo } from '@cig-platform/ui'

import useDeals from '../../hooks/useDeals'
import { dealToDealInfo } from '../../formatters/dealToDealInfo'
import PageTitle from '../../components/PageTitle/PageTitle'

import {
  StyledContainer,
  StyledItem,
  StyledItems,
} from './Sales.styles'

const Sales: VFC = () => {
  const { t } = useTranslation()

  const deals = useDeals({ filter: 'SELLER' })

  const dealInfos = useMemo(() => deals.map(dealToDealInfo), [deals])

  const handleViewDeal = useCallback(() => {
    alert('view deal!')
  }, [])

  return (
    <StyledContainer>
      <PageTitle>
        {t('sales')}
      </PageTitle>
      <StyledItems>
        {dealInfos.map((deal, index) => (
          <StyledItem key={deals[index].deal.id}>
            <DealInfo {...deal} onViewDeal={handleViewDeal} />
          </StyledItem>
        ))}
      </StyledItems>
    </StyledContainer>
  )
}

export default Sales
