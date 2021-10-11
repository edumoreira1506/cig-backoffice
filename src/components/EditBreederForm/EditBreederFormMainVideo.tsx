import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@cig-platform/ui'

import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectMainVideo } from '../../contexts/EditBreederContext/editBreederSelectors'
import { setMainVideo } from '../../contexts/EditBreederContext/editBreederActions'

export default function EditBreederFormMainVideo() {
  const { t } = useTranslation()

  const mainVideo = useEditBreederSelector(selectMainVideo)

  const dispatch = useEditBreederDispatch()

  const handleChangeMainVideo = useCallback((newMainVideo: string | number) => {
    dispatch(setMainVideo(String(newMainVideo)))
  }, [dispatch])

  return (
    <Input
      placeholder="URL do youtube do vídeo de apresentação"
      label={t('breeder.fields.main-video')}
      value={mainVideo}
      onChange={handleChangeMainVideo}
    />
  )
}
