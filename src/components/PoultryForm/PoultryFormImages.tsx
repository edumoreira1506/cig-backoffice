import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectImages } from 'contexts/PoultryContext/poultrySelectors'
import { S3Folders, S3Subfolders } from 'constants/s3'
import { setImages } from 'contexts/PoultryContext/poultryActions'
import { info } from 'utils/alert'
import ImagesWithGallery from 'components/ImagesWithGallery/ImagesWithGallery'

export default function PoultryFormImages() {
  const { t } = useTranslation()

  const images = usePoultrySelector(selectImages)

  const dispatch = usePoultryDispatch()

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
    <ImagesWithGallery
      images={images}
      folder={S3Folders.Poultries}
      subfolder={S3Subfolders.Images}
      onUpload={handleUploadImage}
      onRemove={handleRemoveImage}
    />
  )
}
