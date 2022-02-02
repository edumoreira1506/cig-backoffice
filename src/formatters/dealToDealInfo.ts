import { IDeal } from '@cig-platform/types'
import { DealInfoProps } from '@cig-platform/ui'

import { Deal } from '../hooks/useDeals'

const getDealStatus = (deal: IDeal) => {
  if (deal.cancelled) return 'CANCELLED'
  if (deal.finished) return 'FINISHED'
  return 'IN_PROGRESS'
}

export const dealToDealInfo = (deal: Deal): Omit<DealInfoProps, 'onViewDeal'> => {
  const status = getDealStatus(deal.deal)

  return {
    advertising: deal.advertising,
    breeder: deal.breeder,
    date: new Date(deal.deal.createdAt),
    poultry: deal.poultry,
    status,
  }
}
