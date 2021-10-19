import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectVideos } from 'contexts/PoultryContext/poultrySelectors'
import { setVideo } from 'contexts/PoultryContext/poultryActions'
import { StyledFormField } from './NewPoultryForm.styles'
import { Input } from '@cig-platform/ui'

export default function NewPoultryFormVideos() {
  const { t } = useTranslation()

  const videos = usePoultrySelector(selectVideos)

  const dispatch = usePoultryDispatch()
  
  const handleChangePresentation = useCallback((newPresentation: string | number) => {
    dispatch(setVideo(String(newPresentation), 'presentation'))
  }, [dispatch])

  const handleChangeWalking = useCallback((newWalking: string | number) => {
    dispatch(setVideo(String(newWalking), 'walking'))
  }, [dispatch])

  return (
    <>
      <StyledFormField>
        <Input
          type="text"
          label={t('poultry.fields.videos.presentation')}
          value={videos.presentation ?? ''}
          onChange={handleChangePresentation}
        />
      </StyledFormField>
      <StyledFormField>
        <Input
          type="text"
          label={t('poultry.fields.videos.walking')}
          value={videos.walking ?? ''}
          onChange={handleChangeWalking}
        />
      </StyledFormField>
    </>
  )
}
