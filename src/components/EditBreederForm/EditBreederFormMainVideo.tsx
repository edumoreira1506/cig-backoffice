import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import youtubeUrl from 'youtube-url'
import { Input } from '@cig-platform/ui'

import { useEditBreederDispatch, useEditBreederSelector } from 'contexts/EditBreederContext/EditBreederContext'
import { selectMainVideo } from 'contexts/EditBreederContext/editBreederSelectors'
import { setMainVideo } from 'contexts/EditBreederContext/editBreederActions'
import Player from 'components/Player/Player'

export default function EditBreederFormMainVideo() {
  const { t } = useTranslation()

  const mainVideo = useEditBreederSelector(selectMainVideo)

  const dispatch = useEditBreederDispatch()

  const handleChangeMainVideo = useCallback((newMainVideo: string | number) => {
    dispatch(setMainVideo(String(newMainVideo)))
  }, [dispatch])

  const isValidYoutubeUrl = useMemo(() => youtubeUrl.valid(mainVideo), [mainVideo])

  return (
    <>
      <Input
        placeholder="URL do youtube do vídeo de apresentação"
        label={t('breeder.fields.main-video')}
        value={mainVideo}
        onChange={handleChangeMainVideo}
      />
      {isValidYoutubeUrl && (
        <Player url={mainVideo} dataTestId="player" />
      )}
    </>
  )
}
