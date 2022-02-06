import React, { VFC, useMemo, useCallback } from 'react'
import MicroFrontend from '@cig-platform/microfrontend-helper'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useBreeder from '../../hooks/useBreeder'
import { DEAL_PAGE_URL } from '../../constants/url'
import useFinishDeal from '../../hooks/useFinishDeal'
import { success, withInput } from '../../utils/alert'
import useCancelDeal from 'hooks/useCancelDeal'

const Purchase: VFC = () => {
  const { dealId } = useParams<{ dealId: string }>()

  const { t } = useTranslation()

  const breeder = useBreeder()

  const handleSuccess = useCallback(() => {
    success(t('common.updated'), t, () => window.location.reload())
  }, [])

  const finishDeal = useFinishDeal({ onSuccess: handleSuccess })

  const cancelDeal = useCancelDeal({ onSuccess: handleSuccess })

  const handleCancelDeal = useCallback(({ advertisingId, dealId, poultryId, breederId }: {
    advertisingId: string;
    dealId: string;
    poultryId: string;
    breederId: string;
  }) => {
    withInput(t('reason-of-cancel'), t, (a) => {
      if (a) {
        cancelDeal({ reason: a, advertisingId, dealId, poultryId, breederId })
      }
    })
  }, [cancelDeal, t])

  const microFrontendParams = useMemo(() => ({
    dealId,
    breederId: breeder?.id ?? '',
  }), [dealId, breeder])

  const microFrontendCallbacks = useMemo<Record<string, any>>(() => ({
    onFinishDeal: finishDeal,
    onCancelDeal: handleCancelDeal,
  }), [])

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
