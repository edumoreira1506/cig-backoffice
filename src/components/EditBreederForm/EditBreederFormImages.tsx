import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileImagesCarousel, ImageGallery } from '@cig-platform/ui'

import { useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectImages } from '../../contexts/EditBreederContext/editBreederSelectors'
import { createImageUrl } from '../../utils/s3'
import { S3Subfolders, S3Folders } from '../../constants/s3'
import { setImages } from '../../contexts/EditBreederContext/editBreederActions'
import { useEditBreederDispatch } from '../../contexts/EditBreederContext/EditBreederContext'
import { info } from '../../utils/alert'
import Modal from '../Modal/Modal'

export default function EditBreederFormImages() {
  const [isOpenGallery, setIsOpenGallery] = useState(false)

  const [galleryIndex, setGalleryIndex] = useState(0)

  const dispatch = useEditBreederDispatch()

  const closeGallery = useCallback(() => setIsOpenGallery(false), [])
  const openGallery = useCallback(() => setIsOpenGallery(true), [])

  const images = useEditBreederSelector(selectImages)

  const { t } = useTranslation()

  const activeImages = useMemo(() => images.filter(image => !image.isDeleted), [images])

  const formattedImagesOfCarousel = useMemo(() => activeImages.map((image) => ({
    src: image.isNew ? image.imageUrl : createImageUrl({ folder: S3Folders.Breeders, fileName: image.imageUrl, subfolder: S3Subfolders.Images }),
    alt: image.imageUrl
  })), [activeImages])

  const formattedImagesOfGallery = useMemo(() => activeImages.map((image) => ({
    original: image.isNew ? image.imageUrl : createImageUrl({ folder: S3Folders.Breeders, fileName: image.imageUrl, subfolder: S3Subfolders.Images }),
    thumbnail: image.isNew ? image.imageUrl : createImageUrl({ folder: S3Folders.Breeders, fileName: image.imageUrl, subfolder: S3Subfolders.Images }),
  })), [activeImages])

  const handleClickImage = useCallback((imageSrc: string) => {
    const imageIndex = formattedImagesOfCarousel.findIndex(image => image.src === imageSrc)

    setGalleryIndex(imageIndex)
    openGallery()
  }, [formattedImagesOfCarousel, openGallery])

  const handleUploadImage = useCallback((newImage: File) => {
    const fr = new FileReader()

    fr.readAsDataURL(newImage)
    fr.onload = function() {
      const src = String(this.result)
      const image = {
        breederId: '',
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
    <>
      <FileImagesCarousel
        images={formattedImagesOfCarousel}
        onClickImage={handleClickImage}
        onUpload={handleUploadImage}
        onDeleteImage={handleRemoveImage}
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
