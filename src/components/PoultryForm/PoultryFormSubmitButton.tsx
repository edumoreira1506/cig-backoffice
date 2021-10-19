import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@cig-platform/ui'

import { PoultryFormProps } from './PoultryForm'
import { usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectBirthDate, selectColors, selectType, selectVideos } from 'contexts/PoultryContext/poultrySelectors'

export interface PoultryFormSubmitButtonProps {
  onSubmit: PoultryFormProps['onSubmit']
}

export default function PoultryFormSubmitButton({ onSubmit }: PoultryFormSubmitButtonProps) {
  const { t } = useTranslation()

  const type = usePoultrySelector(selectType)
  const birthDate = usePoultrySelector(selectBirthDate)
  const videos = usePoultrySelector(selectVideos)
  const colors = usePoultrySelector(selectColors)

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    onSubmit({
      type,
      colors,
      videos,
      birthDate: new Date(birthDate),
    })
  }, [
    onSubmit,
    colors,
    type,
    videos,
    birthDate,
  ])

  return (
    <Button onClick={handleSubmit} type="submit">
      {t('common.save')}
    </Button>
  )
}