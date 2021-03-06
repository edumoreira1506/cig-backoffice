import { IDeal } from '@cig-platform/types'
import { Colors } from '@cig-platform/ui'

import { S3Folders, S3Subfolders } from 'constants/s3'
import { Deal } from 'hooks/useDeals'
import { createImageUrl } from 'utils/s3'

const getDealStatus = (deal: IDeal) => {
  if (deal.cancelled) return 'Cancelado'
  if (deal.finished) return 'Finalizado'
  return 'Em andamento'
}

const getDealStatusColor = (deal: IDeal) => {
  if (deal.cancelled) return Colors.LightRed
  if (deal.finished) return Colors.SuccessGreen
  return Colors.LightBlue
}

export const dealToPoultryCard = (deal: Deal) => {
  const status = getDealStatus(deal.deal)
  const statusColor = getDealStatusColor(deal.deal)

  const lastMeasurement = deal?.measurementAndWeight?.find(item => Boolean(Number(item?.metadata?.measurement)))

  return {
    title: deal.poultry.name,
    price: deal.advertising.price,
    subtitle: status,
    subtitleColor: statusColor,
    description: `${deal.breeder.name} - ${[
      deal?.poultry?.birthDate && new Date(deal.poultry.birthDate).toLocaleDateString(),
      lastMeasurement?.metadata?.measurement && `${lastMeasurement.metadata.measurement} cm`
    ].filter(Boolean).join(' ')}`,
    image: deal?.mainImage && createImageUrl({
      fileName: deal.mainImage,
      subfolder: S3Subfolders.Images,
      folder: S3Folders.Poultries
    })
  }
}
