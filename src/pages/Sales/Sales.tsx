import React, { useCallback, VFC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DealInfo } from '@cig-platform/ui'
import { useHistory } from 'react-router-dom'

import useDeals from '../../hooks/useDeals'
import { dealToDealInfo } from '../../formatters/dealToDealInfo'
import PageTitle from '../../components/PageTitle/PageTitle'
import { Routes } from '../../constants/routes'

import {
  StyledContainer,
  StyledItem,
  StyledItems,
} from './Sales.styles'

const Sales: VFC = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const deals = useDeals({ filter: 'SELLER' })

  const dealInfos = useMemo(() => deals.map(dealToDealInfo), [deals])

  const handleViewDeal = useCallback((dealId) => {
    history.push(Routes.Sale.replace(':dealId', dealId))
  }, [history])

  return (
    <StyledContainer>
      <PageTitle>
        {t('sales')}
      </PageTitle>
      <StyledItems>
        {dealInfos.map((deal, index) => (
          <StyledItem key={deals[index].deal.id}>
            <DealInfo {...deal} onViewDeal={() => handleViewDeal(deals[index].deal.id)} />
          </StyledItem>
        ))}
      </StyledItems>
    </StyledContainer>
  )
}

export default Sales
