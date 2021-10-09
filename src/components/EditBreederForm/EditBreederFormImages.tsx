import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from 'react-modal'
import { Colors, FileImagesCarousel, ImageGallery } from '@cig-platform/ui'

import { useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectImages } from '../../contexts/EditBreederContext/editBreederSelectors'
import { createImageUrl } from '../../utils/s3'
import { S3Subfolders, S3Folders } from '../../constants/s3'
import { setImages } from '../../contexts/EditBreederContext/editBreederActions'
import { useEditBreederDispatch } from '../../contexts/EditBreederContext/EditBreederContext'
import { info } from '../../utils/alert'

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
      const newImage = {
        breederId: '',
        id: '',
        imageUrl: src,
        isNew: true,
      }

      dispatch(setImages([...images, newImage]))
    } 
  }, [images, dispatch])

  const handleRemoveImage = useCallback((imageSrc: string) => {
    info(t('breeder.delete-image'), t, () => {
      const newImages = images.map((image) => imageSrc.includes(image.imageUrl) ? ({
        ...image,
        isDeleted: true,
      }) : ({ ...image }))

      dispatch(setImages(newImages))
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
