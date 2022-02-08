import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Select, TextField, Table } from '@cig-platform/ui'
import { useParams } from 'react-router-dom'

import { useRegisterDispatch, useRegisterSelector } from 'contexts/RegisterContext/RegisterContext'
import {
  selectDescription,
  selectVaccinationDate,
  selectVaccinationDose,
  selectVaccinationName,
} from 'contexts/RegisterContext/registerSelectors'
import {
  setVaccinationName,
  setVaccinationDate,
  setVaccinationDose,
  setDescription,
} from 'contexts/RegisterContext/registerActions'
import usePoultryRegisters from 'hooks/usePoultryRegisters'

import {
  StyledContainer,
  StyledButton,
  StyledForm,
  StyledField,
  StyledDescriptionField,
  StyledTable,
  StyledTitle
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
  
  const { poultryId } = useParams<{ poultryId: string }>()

  const vaccines = usePoultryRegisters({ registerType: 'VACINAÇÃO', poultryId })

  const { t } = useTranslation()

  const dispatch = useRegisterDispatch()

  const openForm = useCallback(() => setShowForm(true), [])

  const name = useRegisterSelector(selectVaccinationName)
  const dose = useRegisterSelector(selectVaccinationDose)
  const date = useRegisterSelector(selectVaccinationDate)
  const description = useRegisterSelector(selectDescription)

  const handleChangeName = useCallback((newName: string | number) => {
    dispatch(setVaccinationName(newName.toString()))
  }, [dispatch])

  const handleChangeDose = useCallback((newDose: string | number) => {
    dispatch(setVaccinationDose(newDose.toString()))
  }, [dispatch])

  const handleChangeDate = useCallback((newDate: string | number) => {
    dispatch(setVaccinationDate(newDate.toString()))
  }, [dispatch])

  const handleChangeDescription = useCallback((newDescription: number | string) => {
    dispatch(setDescription(newDescription.toString()))
  }, [dispatch])

  const formattedRows = useMemo(() => vaccines.map(vaccine => ({
    items: [new Intl.DateTimeFormat('pt-BR').format(new Date(vaccine.date)), vaccine?.metadata?.name, `${vaccine?.metadata?.dose}ª`],
    expandedContent: vaccine.description
  })).reverse(), [vaccines])

  return (
    <StyledContainer title={title}>
      <StyledTitle>{t('applied-vaccinations')}</StyledTitle>
      <StyledTable>
        <Table
          hasExpandColumn
          columns={[t('register.fields.vaccination.date'), t('register.fields.vaccination.name'), t('register.fields.vaccination.dose')]}
          rows={formattedRows}
          emptyStateText={t('empty-text.vaccination')}
        />
      </StyledTable>
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
          <StyledDescriptionField>
            <TextField
              value={description}
              onChange={handleChangeDescription}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae laoreet nisi. Cras sed libero consectetur, sodales lorem at, rutrum nulla."
              label={t('register.fields.description')}
            />
          </StyledDescriptionField>
        </StyledForm>
      )}
    </StyledContainer>
  )
}
