import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@cig-platform/ui'

import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectDescription } from '../../contexts/EditBreederContext/editBreederSelectors'
import { setDescription } from '../../contexts/EditBreederContext/editBreederActions'

export default function EditBreederFormDescription() {
  const { t } = useTranslation()

  const description = useEditBreederSelector(selectDescription)

  const dispatch = useEditBreederDispatch()

  const handleChangeDescription = useCallback((newDescription: string | number) => {
    dispatch(setDescription(String(newDescription)))
  }, [dispatch])

  return (
    <TextField
      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae laoreet nisi. Cras sed libero consectetur, sodales lorem at, rutrum nulla."
      label={t('breeder.fields.description')}
      value={description}
      onChange={handleChangeDescription}
    />
  )
}
