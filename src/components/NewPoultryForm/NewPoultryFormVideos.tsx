import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import youtubeUrl from 'youtube-url'
import { Input } from '@cig-platform/ui'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectVideos } from 'contexts/PoultryContext/poultrySelectors'
import Player from 'components/Player/Player'
import { setVideo } from 'contexts/PoultryContext/poultryActions'

import { StyledFormField } from './NewPoultryForm.styles'

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
      {youtubeUrl.valid(videos.presentation) && (
        <Player url={videos.presentation ?? ''} />
      )}
      <StyledFormField>
        <Input
          type="text"
          label={t('poultry.fields.videos.walking')}
          value={videos.walking ?? ''}
          onChange={handleChangeWalking}
        />
      </StyledFormField>
      {youtubeUrl.valid(videos.walking) && (
        <Player url={videos.walking ?? ''} />
      )}
    </>
  )
}
