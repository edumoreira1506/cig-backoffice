import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@cig-platform/ui'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectMeasurement } from 'contexts/PoultryContext/poultrySelectors'
import { setMeasurement } from 'contexts/PoultryContext/poultryActions'

export default function PoultryFormMeasurement() {
  const { t } = useTranslation()

  const measurement = usePoultrySelector(selectMeasurement)

  const dispatch = usePoultryDispatch()

  const handleChangeMeasurement = useCallback((newMeasurement: string | number) => {
    dispatch(setMeasurement(Number(newMeasurement)))
  }, [dispatch])
  
  return (
    <Input
      type="number"
      label={t('poultry.fields.measurement')}
      value={measurement || ''}
      onChange={handleChangeMeasurement}
    />
  )
}
