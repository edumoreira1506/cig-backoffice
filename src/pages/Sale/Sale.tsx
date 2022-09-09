import React, { VFC, useMemo, useCallback } from 'react'
import MicroFrontend from '@cig-platform/microfrontend-helper'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useBreeder from '../../hooks/useBreeder'
import { DEAL_PAGE_URL } from '../../constants/url'
import useConfirmDeal from '../../hooks/useConfirmDeal'
import { success } from '../../utils/alert'
import useCancelDeal from 'hooks/useCancelDeal'
import { useRefetch } from '@cig-platform/hooks'

const Sale: VFC = () => {
  const { dealId } = useParams<{ dealId: string }>()

  const { refetch, setRefetch } = useRefetch()

  const { t } = useTranslation()

  const breeder = useBreeder()

  const handleSuccess = useCallback(() => {
    success(t('common.updated'), t, () => setRefetch(true))
  }, [])

  const confirmDeal = useConfirmDeal({ onSuccess: handleSuccess })

  const handleConfirmDeal = useCallback((params = {}) => {
    if (!breeder) return

    confirmDeal({
      ...params,
      breederId: breeder.id,
    })
  }, [confirmDeal])

  const cancelDeal = useCancelDeal({ onSuccess: handleSuccess })

  const microFrontendParams = useMemo(() => ({
    dealId: dealId || '',
    breederId: breeder?.id ?? '',
    refetch
  }), [dealId, breeder, refetch])

  const microFrontendCallbacks = useMemo<Record<string, any>>(() => ({
    onConfirmDeal: handleConfirmDeal,
    onCancelDeal: cancelDeal,
  }), [])

  if (!breeder) return null

  return (
    <div id="sale">
      <MicroFrontend
        params={microFrontendParams}
        name="DealPage"
        host={DEAL_PAGE_URL}
        containerId="sale"
        callbacks={microFrontendCallbacks}
      />
    </div>
  )
}

export default Sale
