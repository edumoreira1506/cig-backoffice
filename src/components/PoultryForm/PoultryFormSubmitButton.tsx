import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@cig-platform/ui'

import { PoultryFormProps } from './PoultryForm'
import { usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import {
  selectImages,
  selectBirthDate,
  selectColors,
  selectType,
  selectVideos,
  selectGender,
  selectName,
  selectRegister,
  selectCrest,
  selectDewlap,
  selectTail,
  selectDescription,
  selectGenderCategory
} from 'contexts/PoultryContext/poultrySelectors'
import stringToDate from 'formatters/stringToDate'

export interface PoultryFormSubmitButtonProps {
  onSubmit: PoultryFormProps['onSubmit']
}

export default function PoultryFormSubmitButton({ onSubmit }: PoultryFormSubmitButtonProps) {
  const { t } = useTranslation()

  const type = usePoultrySelector(selectType)
  const birthDate = usePoultrySelector(selectBirthDate)
  const videos = usePoultrySelector(selectVideos)
  const colors = usePoultrySelector(selectColors)
  const images = usePoultrySelector(selectImages)
  const gender = usePoultrySelector(selectGender)
  const name = usePoultrySelector(selectName)
  const register = usePoultrySelector(selectRegister)
  const crest = usePoultrySelector(selectCrest)
  const dewlap = usePoultrySelector(selectDewlap)
  const tail = usePoultrySelector(selectTail)
  const description = usePoultrySelector(selectDescription)
  const genderCategory = usePoultrySelector(selectGenderCategory)

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    onSubmit({
      type,
      colors,
      videos,
      birthDate: stringToDate(birthDate),
      images,
      gender,
      name,
      register,
      crest,
      dewlap,
      tail,
      description,
      genderCategory,
    })
  }, [
    name,
    onSubmit,
    colors,
    type,
    videos,
    birthDate,
    images,
    gender,
    register,
    crest,
    dewlap,
    tail,
    description,
    genderCategory,
  ])

  return (
    <Button onClick={handleSubmit} type="submit">
      {t('common.save')}
    </Button>
  )
}
