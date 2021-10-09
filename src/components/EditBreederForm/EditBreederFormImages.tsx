import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from 'react-modal'
import { Colors, FileImagesCarousel, ImageGallery } from '@cig-platform/ui'

import { useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectImages } from '../../contexts/EditBreederContext/editBreederSelectors'
import { createImageUrl } from '../../utils/s3'
import { S3Subfolders, S3Folders } from '../../constants/s3'

export default function EditBreederFormImages() {
  const [isOpenGallery, setIsOpenGallery] = useState(false)

  const [galleryIndex, setGalleryIndex] = useState(0)

  const closeGallery = useCallback(() => setIsOpenGallery(false), [])
  const openGallery = useCallback(() => setIsOpenGallery(true), [])

  const images = useEditBreederSelector(selectImages)

  const { t } = useTranslation()

  const formattedImagesOfCarousel = useMemo(() => images.map((image) => ({
    src: createImageUrl({ folder: S3Folders.Breeders, fileName: image.imageUrl, subfolder: S3Subfolders.Images }),
    alt: image.imageUrl
  })), [images])

  const formattedImagesOfGallery = useMemo(() => images.map((image) => ({
    original: createImageUrl({ folder: S3Folders.Breeders, fileName: image.imageUrl, subfolder: S3Subfolders.Images }),
    thumbnail: createImageUrl({ folder: S3Folders.Breeders, fileName: image.imageUrl, subfolder: S3Subfolders.Images }),
  })), [images])

  const handleClickImage = useCallback((imageSrc: string) => {
    const imageIndex = formattedImagesOfCarousel.findIndex(image => image.src === imageSrc)

    setGalleryIndex(imageIndex)
    openGallery()
  }, [formattedImagesOfCarousel, openGallery])

  return (
    <>
      <FileImagesCarousel
        images={formattedImagesOfCarousel}
        onClickImage={handleClickImage}
        onUpload={() => alert('upload!')}
        onDeleteImage={() => alert('deletando')}
        uploadMessage={t('common.select-files')}
      />
      <Modal
        isOpen={isOpenGallery}
        onRequestClose={closeGallery}
        style={{ overlay: { background: Colors.BlackTransparent, zIndex: 1000 } }}
      >
        <ImageGallery
          showPlayButton={false}
          items={formattedImagesOfGallery}
          startIndex={galleryIndex}
        />
      </Modal>
    </>
  )
}
