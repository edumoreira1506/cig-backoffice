import React, { useCallback } from 'react'
import { DatePicker } from '@cig-platform/ui'
import { useTranslation } from 'react-i18next'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectBirthDate } from 'contexts/PoultryContext/poultrySelectors'
import { setBirthDate } from 'contexts/PoultryContext/poultryActions'

export default function PoultryFormBirthDate() {
  const birthDate = usePoultrySelector(selectBirthDate)

  const dispatch = usePoultryDispatch()

  const { t } = useTranslation()

  const handleChangeBirthDate = useCallback((newBirthDate: Date) => {
    dispatch(setBirthDate(newBirthDate?.toISOString?.()?.split?.('T')?.[0]))
  }, [dispatch])

  return (
    <DatePicker
      label={t('poultry.fields.birth-date')}
      value={birthDate ? new Date(birthDate) : undefined as any}
      onChange={handleChangeBirthDate as any}
      name="poultry-birth-date"
    />
  )
}
