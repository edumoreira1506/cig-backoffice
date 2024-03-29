import React, { VFC, useMemo, useCallback, Fragment } from 'react'
import MicroFrontend from '@cig-platform/microfrontend-helper'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IDeal } from '@cig-platform/types'

import useBreeder from '../../hooks/useBreeder'
import { DEAL_PAGE_URL } from '../../constants/url'
import useFinishDeal from '../../hooks/useFinishDeal'
import { success } from '../../utils/alert'
import useCancelDeal from '../../hooks/useCancelDeal'
import useReBuy from '../../hooks/useReBuy'
import { Routes } from '../../constants/routes'
import { useRefetch } from '@cig-platform/hooks'

const Purchase: VFC = () => {
  const { dealId } = useParams<{ dealId: string }>()

  const { refetch, setRefetch } = useRefetch()

  const { t } = useTranslation()

  const navigate = useNavigate()

  const breeder = useBreeder()

  const handleSuccess = useCallback(() => {
    success(t('common.updated'), t, () => setRefetch(true))
  }, [])

  const handleSuccessRebuy = useCallback((deal: IDeal) => {
    navigate(`${Routes.Purchase.replace(':dealId', deal.id)}`)
  }, [navigate])

  const finishDeal = useFinishDeal({ onSuccess: () => success(t('common.updated'), t, () => navigate(Routes.ReviewPurchase.replace(':dealId', dealId ?? ''))) })

  const cancelDeal = useCancelDeal({ onSuccess: handleSuccess })

  const reBuy = useReBuy({ onSuccess: handleSuccessRebuy })

  const microFrontendParams = useMemo(() => ({
    dealId: dealId || '',
    breederId: breeder?.id ?? '',
    refetch,
    linkComponent: Fragment
  }), [dealId, breeder, refetch])

  const microFrontendCallbacks = useMemo<Record<string, any>>(() => ({
    onFinishDeal: finishDeal,
    onCancelDeal: cancelDeal,
    onReBuy: reBuy
  }), [finishDeal, cancelDeal])

  if (!breeder) return null

  return (
    <div id="purchase">
      <MicroFrontend
        params={microFrontendParams}
        name="DealPage"
        host={DEAL_PAGE_URL}
        containerId="purchase"
        callbacks={microFrontendCallbacks}
      />
    </div>
  )
}

export default Purchase
