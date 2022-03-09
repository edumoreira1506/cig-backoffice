import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@cig-platform/ui'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectDescription } from 'contexts/PoultryContext/poultrySelectors'
import { setDescription } from 'contexts/PoultryContext/poultryActions'

export default function PoultryFormDescription() {
  const { t } = useTranslation()

  const description = usePoultrySelector(selectDescription)

  const dispatch = usePoultryDispatch()

  const handleChangeDescription = useCallback((newDescription: string | number) => {
    dispatch(setDescription(String(newDescription)))
  }, [dispatch])
  
  return (
    <TextField
      label={t('poultry.fields.description')}
      value={description}
      name="poultry-description"
      onChange={handleChangeDescription}
    />
  )
}
