import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@cig-platform/ui'

import { useRegisterDispatch, useRegisterSelector } from 'contexts/RegisterContext/RegisterContext'
import { setDescription } from 'contexts/RegisterContext/registerActions'
import { selectDescription } from 'contexts/RegisterContext/registerSelectors'

import { StyledForm, StyledFormField } from './RegisterImageForm.styles'

export interface RegisterImageFormProps {
  title: string;
}

export default function RegisterImageForm({ title }: RegisterImageFormProps) {
  const { t } = useTranslation()

  const dispatch = useRegisterDispatch()

  const description = useRegisterSelector(selectDescription)

  const handleChangeDescription = useCallback((newDescription: number | string) => {
    dispatch(setDescription(String(newDescription)))
  }, [dispatch])

  return (
    <StyledForm title={title}>
      <StyledFormField>
        <TextField
          value={description}
          onChange={handleChangeDescription}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae laoreet nisi. Cras sed libero consectetur, sodales lorem at, rutrum nulla."
          label={t('register.fields.description')}
        />
      </StyledFormField>
    </StyledForm>
  )
}
