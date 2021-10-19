import React, { useCallback } from 'react'
import { Input } from '@cig-platform/ui'
import { useTranslation } from 'react-i18next'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectBirthDate } from 'contexts/PoultryContext/poultrySelectors'
import { setBirthDate } from 'contexts/PoultryContext/poultryActions'

export default function PoultryFormBirthDate() {
  const birthDate = usePoultrySelector(selectBirthDate)

  const dispatch = usePoultryDispatch()

  const { t } = useTranslation()

  const handleChangeBirthDate = useCallback((newBirthDate: string | number) => {
    dispatch(setBirthDate(String(newBirthDate)))
  }, [dispatch])

  return (
    <Input
      type="date"
      label={t('poultry.fields.birth-date')}
      value={birthDate}
      onChange={handleChangeBirthDate}
    />
  )
}
