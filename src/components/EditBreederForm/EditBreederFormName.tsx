import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@cig-platform/ui'

import { useEditBreederDispatch, useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectName } from '../../contexts/EditBreederContext/editBreederSelectors'
import { setName } from '../../contexts/EditBreederContext/editBreederActions'

export default function EditBreederFormName() {
  const { t } = useTranslation()

  const name = useEditBreederSelector(selectName)

  const dispatch = useEditBreederDispatch()

  const handleChangeName = useCallback((newName: string | number) => {
    dispatch(setName(String(newName)))
  }, [dispatch])

  return (
    <Input placeholder="Criatório Silva" label={t('breeder.fields.name')} value={name} onChange={handleChangeName} />
  )
}
