import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Select } from '@cig-platform/ui'

import { useRegisterDispatch, useRegisterSelector } from 'contexts/RegisterContext/RegisterContext'
import {
  selectVaccinationDate,
  selectVaccinationDose,
  selectVaccinationName,
} from 'contexts/RegisterContext/registerSelectors'
import { setVaccinationName, setVaccinationDate, setVaccinationDose } from 'contexts/RegisterContext/registerActions'

import {
  StyledContainer,
  StyledButton,
  StyledForm,
  StyledField
} from './RegisterVaccinationForm.styles'
export interface RegisterVaccinationFormProps {
  title: string;
}

const DOSE_OPTIONS = [
  {
    value: '1',
    label: '1ª dose'
  },
  {
    value: '2',
    label: '2ª dose'
  },
  {
    value: '3',
    label: '3ª dose'
  }
]

export default function RegisterVaccinationForm({ title }: RegisterVaccinationFormProps) {
  const [showForm, setShowForm] = useState(false)

  const { t } = useTranslation()

  const dispatch = useRegisterDispatch()

  const openForm = useCallback(() => setShowForm(true), [])

  const name = useRegisterSelector(selectVaccinationName)
  const dose = useRegisterSelector(selectVaccinationDose)
  const date = useRegisterSelector(selectVaccinationDate)

  const handleChangeName = useCallback((newName: string | number) => {
    dispatch(setVaccinationName(newName.toString()))
  }, [dispatch])

  const handleChangeDose = useCallback((newDose: string | number) => {
    dispatch(setVaccinationDose(newDose.toString()))
  }, [dispatch])

  const handleChangeDate = useCallback((newDate: string | number) => {
    dispatch(setVaccinationDate(newDate.toString()))
  }, [dispatch])

  return (
    <StyledContainer title={title}>
      <StyledButton>
        <Button onClick={openForm}>
        Add novo
        </Button>
      </StyledButton>
      {showForm && (
        <StyledForm>
          <StyledField>
            <Input
              placeholder='Vacina exemplo'
              label={t('register.fields.vaccination.name')}
              value={name}
              onChange={handleChangeName}
            />
          </StyledField>
          <StyledField>
            <Input
              label={t('register.fields.vaccination.date')}
              value={date}
              onChange={handleChangeDate}
              type='date'
            />
          </StyledField>
          <StyledField>
            <Select
              label={t('register.fields.vaccination.dose')}
              value={dose}
              onChange={handleChangeDose}
              showEmptyOption
              options={DOSE_OPTIONS}
              emptyOptionText={t('select-the-dose')}
            />
          </StyledField>
        </StyledForm>
      )}
    </StyledContainer>
  )
}
