import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@cig-platform/ui'

import { useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectName, selectDescription, selectFoundationDate, selectAddress } from '../../contexts/EditBreederContext/editBreederSelectors'

import { EditBreederFormProps } from './EditBreederForm'

export interface EditBreederFormSubmitButton {
  onSubmit: EditBreederFormProps['onSubmit']
}

export default function EditBreederFormSubmitButton({ onSubmit }: EditBreederFormSubmitButton) {
  const { t } = useTranslation()

  const name = useEditBreederSelector(selectName)
  const description = useEditBreederSelector(selectDescription)
  const address = useEditBreederSelector(selectAddress)
  const foundationDate = useEditBreederSelector(selectFoundationDate)

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    onSubmit({ name, address, description, foundationDate: new Date(foundationDate) })
  }, [onSubmit, name, address, description, foundationDate])

  return (
    <Button onClick={handleSubmit} type="submit">
      {t('common.save')}
    </Button>
  )
}
