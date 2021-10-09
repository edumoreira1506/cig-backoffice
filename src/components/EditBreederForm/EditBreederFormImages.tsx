import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FileImagesCarousel } from '@cig-platform/ui'

import { useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectImages } from '../../contexts/EditBreederContext/editBreederSelectors'
import { createImageUrl } from '../../utils/s3'
import { S3Subfolders, S3Folders } from '../../constants/s3'

export default function EditBreederFormImages() {
  const images = useEditBreederSelector(selectImages)

  const { t } = useTranslation()

  const formattedImages = useMemo(() => images.map((image) => ({
    src: createImageUrl({ folder: S3Folders.Breeders, fileName: image.imageUrl, subfolder: S3Subfolders.Images }),
    alt: image.imageUrl
  })), [images])

  return (
    <FileImagesCarousel
      images={formattedImages}
      onClickImage={() => alert('clicou na ibagem')}
      onUpload={() => alert('upload!')}
      onDeleteImage={() => alert('deletando')}
      uploadMessage={t('common.select-files')}
    />
  )
}
