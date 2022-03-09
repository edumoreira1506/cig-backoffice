import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@cig-platform/ui'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectName } from 'contexts/PoultryContext/poultrySelectors'
import { setName } from 'contexts/PoultryContext/poultryActions'

export default function PoultryFormName() {
  const { t } = useTranslation()

  const name = usePoultrySelector(selectName)

  const dispatch = usePoultryDispatch()

  const handleChangeName = useCallback((newName: string | number) => {
    dispatch(setName(String(newName)))
  }, [dispatch])
  
  return (
    <Input
      type="text"
      label={t('poultry.fields.name')}
      value={name}
      name="poultry-name"
      onChange={handleChangeName}
    />
  )
}
