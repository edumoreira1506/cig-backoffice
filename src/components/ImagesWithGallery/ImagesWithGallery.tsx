import React, { useCallback, useState, useMemo } from 'react'
import { FileImagesCarousel, ImageGallery } from '@cig-platform/ui'

import Modal from '../Modal/Modal'
import { useTranslation } from 'react-i18next'
import { createImageUrl } from 'utils/s3'

export interface ImagesWithGalleryProps {
  images: {
    isNew?: boolean;
    isDeleted?: boolean;
    raw?: File;
    imageUrl: string;
  }[];
  folder: string;
  subfolder: string;
  onUpload: (newFile: File) => void;
  onRemove: (imageId: string) => void;
}

export default function ImagesWithGallery({ images, folder, subfolder, onUpload, onRemove }: ImagesWithGalleryProps) {
  const { t } = useTranslation()

  const [isOpenGallery, setIsOpenGallery] = useState(false)

  const [galleryIndex, setGalleryIndex] = useState(0)

  const closeGallery = useCallback(() => setIsOpenGallery(false), [])
  const openGallery = useCallback(() => setIsOpenGallery(true), [])

  const activeImages = useMemo(() => images.filter(image => !image.isDeleted), [images])

  const formattedImagesOfCarousel = useMemo(() => activeImages.map((image) => ({
    src: image.isNew ? image.imageUrl : createImageUrl({ folder, fileName: image.imageUrl, subfolder }),
    alt: image.imageUrl
  })), [activeImages, folder, subfolder])

  const formattedImagesOfGallery = useMemo(() => activeImages.map((image) => ({
    original: image.isNew ? image.imageUrl : createImageUrl({ folder, fileName: image.imageUrl, subfolder }),
    thumbnail: image.isNew ? image.imageUrl : createImageUrl({ folder, fileName: image.imageUrl, subfolder }),
  })), [activeImages, folder, subfolder])

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
        onUpload={onUpload}
        onDeleteImage={onRemove}
        uploadMessage={t('common.select-files')}
      />
      <Modal isOpen={isOpenGallery} onClose={closeGallery} >
        <ImageGallery
          showPlayButton={false}
          items={formattedImagesOfGallery}
          startIndex={galleryIndex}
        />
      </Modal>
    </>
  )
}
