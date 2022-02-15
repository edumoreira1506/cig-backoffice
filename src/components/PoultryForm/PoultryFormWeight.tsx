import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@cig-platform/ui'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectWeight } from 'contexts/PoultryContext/poultrySelectors'
import { setWeight } from 'contexts/PoultryContext/poultryActions'

export default function PoultryFormWeight() {
  const { t } = useTranslation()

  const weight = usePoultrySelector(selectWeight)

  const dispatch = usePoultryDispatch()

  const handleChangeWeight = useCallback((newWeight: string | number) => {
    dispatch(setWeight(Number(newWeight)))
  }, [dispatch])
  
  return (
    <Input
      type="number"
      label={t('poultry.fields.weight')}
      value={weight || ''}
      onChange={handleChangeWeight}
    />
  )
}
