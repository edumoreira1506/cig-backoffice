import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, TextField, Table } from '@cig-platform/ui'
import { useParams } from 'react-router-dom'

import {
  selectDescription,
  selectMeasurement,
  selectMeasurementAndWeighingDate,
  selectWeight,
} from 'contexts/RegisterContext/registerSelectors'
import { useRegisterDispatch, useRegisterSelector } from 'contexts/RegisterContext/RegisterContext'
import {
  setDescription,
  setMeasurement,
  setMeasurementAndWeighingDate,
  setWeighing,
} from 'contexts/RegisterContext/registerActions'
import usePoultryRegisters from 'hooks/usePoultryRegisters'

import {
  StyledContainer,
  StyledButton,
  StyledForm,
  StyledField,
  StyledDescriptionField,
  StyledTitle,
  StyledTable
} from './RegisterMeasurementAndWeighingForm.styles'

interface RegisterMeasurementAndWeighingFormProps {
  title: string;
}

export default function RegisterMeasurementAndWeighingForm({ title }: RegisterMeasurementAndWeighingFormProps) {
  const [showForm, setShowForm] = useState(false)

  const { t } = useTranslation()

  const { poultryId } = useParams<{ poultryId: string }>()

  const registers = usePoultryRegisters({ registerType: 'MEDIÇÃO E PESAGEM', poultryId: poultryId || '' })

  const dispatch = useRegisterDispatch()

  const openForm = useCallback(() => setShowForm(true), [])

  const weight = useRegisterSelector(selectWeight)
  const measurement = useRegisterSelector(selectMeasurement)
  const date = useRegisterSelector(selectMeasurementAndWeighingDate)
  const description = useRegisterSelector(selectDescription)

  const handleChangeWeight = useCallback((newWeight: string | number) => {
    dispatch(setWeighing(newWeight.toString()))
  }, [dispatch])

  const handleChangeMeasurement = useCallback((newMeasurement: string | number) => {
    dispatch(setMeasurement(newMeasurement.toString()))
  }, [dispatch])

  const handleChangeDate = useCallback((newDate: string | number) => {
    dispatch(setMeasurementAndWeighingDate(newDate.toString()))
  }, [dispatch])

  const handleChangeDescription = useCallback((newDescription: number | string) => {
    dispatch(setDescription(newDescription.toString()))
  }, [dispatch])

  const formattedRows = useMemo(() => registers.map(register => ({
    items: [
      new Intl.DateTimeFormat('pt-BR').format(new Date(register.date)),
      register?.metadata?.weight ? `${register.metadata.weight} KG` : 'Não informado',
      register?.metadata?.measurement ? `${register.metadata.measurement} CM` : 'Não informado'
    ],
    expandedContent: register.description
  })).reverse(), [registers])

  return (
    <StyledContainer title={title}>
      <StyledTitle>AMFA</StyledTitle>
      <StyledTable>
        <Table
          hasExpandColumn
          columns={[t('register.fields.measurement-and-weighing.date'), t('register.fields.measurement-and-weighing.weight'), t('register.fields.measurement-and-weighing.measurement')]}
          rows={formattedRows}
          emptyStateText={t('empty-text.measurement-and-weighing')}
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
              label={t('register.fields.measurement-and-weighing.date')}
              value={date}
              onChange={handleChangeDate}
              type="date"
            />
          </StyledField>
          <StyledField>
            <Input
              label={t('register.fields.measurement-and-weighing.weight')}
              value={weight}
              onChange={handleChangeWeight}
              placeholder='Peso em KG'
            />
          </StyledField>
          <StyledField>
            <Input
              label={t('register.fields.measurement-and-weighing.measurement')}
              value={measurement}
              onChange={handleChangeMeasurement}
              placeholder='Medida em CM'
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
