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
    dispatch(setWeight(Number(String(newWeight).replace(' KG', ''))))
  }, [dispatch])
  
  return (
    <Input
      type="text"
      label={t('poultry.fields.weight')}
      value={weight ? `${weight} KG` : ''}
      onChange={handleChangeWeight}
      name="poultry-weight"
    />
  )
}
