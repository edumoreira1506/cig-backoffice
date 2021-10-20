import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FileImagesCarousel } from '@cig-platform/ui'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectImages } from 'contexts/PoultryContext/poultrySelectors'
import { createImageUrl } from 'utils/s3'
import { S3Folders, S3Subfolders } from 'constants/s3'
import { setImages } from 'contexts/PoultryContext/poultryActions'
import { info } from 'utils/alert'

export default function PoultryFormImages() {
  const { t } = useTranslation()

  const images = usePoultrySelector(selectImages)

  const dispatch = usePoultryDispatch()

  const activeImages = useMemo(() => images.filter(image => !image.isDeleted), [images])

  const formattedImagesOfCarousel = useMemo(() => activeImages.map((image) => ({
    src: image.isNew ? image.imageUrl : createImageUrl({ folder: S3Folders.Poultries, fileName: image.imageUrl, subfolder: S3Subfolders.Images }),
    alt: image.imageUrl
  })), [activeImages])

  const handleUploadImage = useCallback((newImage: File) => {
    const fr = new FileReader()

    fr.readAsDataURL(newImage)
    fr.onload = function() {
      const src = String(this.result)
      const image = {
        poultryId: '',
        id: '',
        imageUrl: src,
        isNew: true,
        raw: newImage
      }

      dispatch(setImages([...images, image]))
    } 
  }, [images, dispatch])

  const handleRemoveImage = useCallback((imageSrc: string) => {
    info(t('common.confirm-delete-image'), t, () => {
      const image = images.find((image) => imageSrc.includes(image.imageUrl))

      if (!image) return

      if (image.isNew) {
        const newImages = images.filter((image) => imageSrc.includes(image.imageUrl))

        dispatch(setImages(newImages))
      } else {
        const newImages = images.map((image) => imageSrc.includes(image.imageUrl) ? ({
          ...image,
          isDeleted: true,
        }) : ({ ...image }))

        dispatch(setImages(newImages))
      }
    })
  }, [t, dispatch, images])

  return (
    <FileImagesCarousel
      images={formattedImagesOfCarousel}
      onClickImage={console.log}
      onUpload={handleUploadImage}
      onDeleteImage={handleRemoveImage}
      uploadMessage={t('common.select-files')}
    />
  )
}
