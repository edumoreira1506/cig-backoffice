import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@cig-platform/ui'

import { useEditBreederSelector } from '../../contexts/EditBreederContext/EditBreederContext'
import {
  selectName,
  selectDescription,
  selectFoundationDate,
  selectAddress,
  selectIsLoading,
  selectImages,
  selectMainVideo,
  selectContacts,
} from '../../contexts/EditBreederContext/editBreederSelectors'

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
  const isLoading = useEditBreederSelector(selectIsLoading)
  const images = useEditBreederSelector(selectImages)
  const mainVideo = useEditBreederSelector(selectMainVideo)
  const contacts = useEditBreederSelector(selectContacts)

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    onSubmit({
      name,
      address,
      description,
      foundationDate,
      images,
      mainVideo,
      contacts
    })
  }, [
    onSubmit,
    name,
    address,
    description,
    foundationDate,
    images,
    mainVideo,
    contacts,
  ])

  return (
    <Button onClick={handleSubmit} type="submit" isLoading={isLoading}>
      {t('common.save')}
    </Button>
  )
}
