import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectId, selectImages } from '../../contexts/EditBreederContext/editBreederSelectors'
import { S3Subfolders, S3Folders } from '../../constants/s3'
import { setImages } from '../../contexts/EditBreederContext/editBreederActions'
import { useEditBreederDispatch } from '../../contexts/EditBreederContext/EditBreederContext'
import { info } from '../../utils/alert'
import ImagesWithGallery from 'components/ImagesWithGallery/ImagesWithGallery'
import useSaveBreederImages from 'hooks/useSaveBreederImages'
import BackofficeBffService from 'services/BackofficeBffService'
import useAuth from 'hooks/useAuth'

export default function EditBreederFormImages() {
  const dispatch = useEditBreederDispatch()

  const saveBreederImages = useSaveBreederImages({ onSuccess: () => null })

  const images = useEditBreederSelector(selectImages)
  const breederId = useEditBreederSelector(selectId)

  const { token } = useAuth()

  const { t } = useTranslation()

  const handleUploadImage = useCallback((newImage: File) => {
    const fr = new FileReader()

    fr.readAsDataURL(newImage)
    fr.onload = async function() {
      const src = String(this.result)
      const image = {
        breederId,
        id: '',
        imageUrl: src,
        isNew: true,
        raw: newImage
      }

      dispatch(setImages([...images, image]))

      await saveBreederImages([image])

      const { breeder: { images: imagesFromAPI } } = await BackofficeBffService.getBreeder(breederId, token)

      setTimeout(() => dispatch(setImages(imagesFromAPI)), 1000)
    } 
  }, [images, dispatch, saveBreederImages, breederId])

  const handleRemoveImage = useCallback((imageSrc: string) => {
    info(t('common.confirm-delete-image'), t, async () => {
      const image = images.find((image) => imageSrc.includes(image.imageUrl))

      if (!image) return

      const newImages = images.filter((image) => !imageSrc.includes(image.imageUrl))

      await saveBreederImages([{ ...image, isDeleted: true }])
      
      dispatch(setImages(newImages))
    })
  }, [t, dispatch, images])

  return (
    <ImagesWithGallery
      images={images}
      folder={S3Folders.Breeders}
      subfolder={S3Subfolders.Images}
      onUpload={handleUploadImage}
      onRemove={handleRemoveImage}
    />
  )
}
