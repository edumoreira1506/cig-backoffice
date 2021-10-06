import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoundFileInput } from '@cig-platform/ui'

import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectProfileImage } from '../../contexts/EditBreederContext/editBreederSelectors'
import { setProfileImage } from '../../contexts/EditBreederContext/editBreederActions'
import { S3_BUCKET_URL } from '../../constants/url'
import { createImageUrl } from '../../utils/s3'
import { S3Folders, S3Subfolders } from '../../constants/s3'
import useEditBreeder from '../../hooks/useEditBreeder'
import { success } from '../../utils/alert'
import useAuth from '../../hooks/useAuth'
import useRefreshToken from '../../hooks/useRefreshToken'

export default function EditBreederFormProfileImage() {
  const { token } = useAuth()

  const refreshToken = useRefreshToken(token)

  const { t } = useTranslation()

  const handleSuccessEditImage = useCallback(() => {
    success(t('common.updated'), t)
  }, [t])

  const editBreeder = useEditBreeder({ onSuccess: handleSuccessEditImage })

  const [notUploadedFile, setNotUploadedFile] = useState('')

  const profileImage = useEditBreederSelector(selectProfileImage)

  const dispatch = useEditBreederDispatch()

  const handleUploadProfileImage = useCallback((newProfileImage: File) => {
    dispatch(setProfileImage(newProfileImage))

    const fr = new FileReader()

    fr.readAsDataURL(newProfileImage)
    fr.onload = function() {
      setNotUploadedFile(String(this.result))
    } 

    editBreeder({ files: [newProfileImage] })
    refreshToken()
  }, [dispatch, editBreeder])

  const { file, imagePlaceholderPath } = useMemo(() => ({
    imagePlaceholderPath: notUploadedFile ?? createImageUrl({ folder: S3Folders.Breeders, subfolder: S3Subfolders.Profile, fileName: profileImage.name }),
    file: notUploadedFile ? undefined : profileImage
  }), [notUploadedFile, profileImage])

  return (
    <RoundFileInput
      baseUrl={`${S3_BUCKET_URL}/${S3Folders.Breeders}/${S3Subfolders.Profile}`}
      imagePlaceholderPath={imagePlaceholderPath}
      file={file}
      onUpload={handleUploadProfileImage}
      uploadMessage={t('breeder.upload-image')}
    />
  )
}
