import React, { useCallback, VFC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { DealInfo } from '@cig-platform/ui'

import useDeals from '../../hooks/useDeals'
import { dealToDealInfo } from '../../formatters/dealToDealInfo'
import PageTitle from '../../components/PageTitle/PageTitle'
import { Routes } from '../../constants/routes'

import {
  StyledContainer,
  StyledItem,
  StyledItems,
} from './Purchases.styles'

const Purchases: VFC = () => {
  const { t } = useTranslation()

  const history = useHistory()

  const deals = useDeals({ filter: 'BUYER' })

  const dealInfos = useMemo(() => deals.map(dealToDealInfo), [deals])

  const handleViewDeal = useCallback((dealId) => {
    history.push(Routes.Purchase.replace(':dealId', dealId))
  }, [history])

  return (
    <StyledContainer>
      <PageTitle>
        {t('purchases')}
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

export default Purchases
