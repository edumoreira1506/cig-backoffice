import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, TextField, Table, DatePicker } from '@cig-platform/ui'
import { useParams } from 'react-router-dom'

import {
  selectDescription,
  selectMeasurement,
  selectMeasurementAndWeighingDate,
  selectRefetchData,
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

  const { data, refetch } = usePoultryRegisters({ registerType: 'MEDIÇÃO E PESAGEM', poultryId: poultryId || '' })

  const registers = data?.registers ?? []

  const dispatch = useRegisterDispatch()

  const openForm = useCallback(() => setShowForm(true), [])

  const weight = useRegisterSelector(selectWeight)
  const measurement = useRegisterSelector(selectMeasurement)
  const date = useRegisterSelector(selectMeasurementAndWeighingDate)
  const description = useRegisterSelector(selectDescription)
  const refetchData = useRegisterSelector(selectRefetchData)

  useEffect(() => {
    if (refetchData && refetch) {
      refetch()

      dispatch(setWeighing(''))
      dispatch(setMeasurement(''))
      dispatch(setMeasurementAndWeighingDate(''))
      dispatch(setDescription(''))
    }
  }, [refetch, refetchData, dispatch])

  const handleChangeWeight = useCallback((newWeight: string | number) => {
    dispatch(setWeighing(String(newWeight).replace(' KG', '')))
  }, [dispatch])

  const handleChangeMeasurement = useCallback((newMeasurement: string | number) => {
    dispatch(setMeasurement(String(newMeasurement).replace(' CM', '')))
  }, [dispatch])

  const handleChangeDate = useCallback((newDate: Date) => {
    dispatch(setMeasurementAndWeighingDate(newDate?.toISOString?.()?.split?.('T')?.[0]))
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
            <DatePicker
              label={t('register.fields.measurement-and-weighing.date')}
              value={date ? new Date(date) : undefined as any}
              onChange={handleChangeDate as any}
              name="date"
            />
          </StyledField>
          <StyledField>
            <Input
              label={t('register.fields.measurement-and-weighing.weight')}
              value={weight ?? ''}
              onChange={handleChangeWeight}
              placeholder='Peso em KG'
              name="weight"
              type='number'
              mask='### KG'
            />
          </StyledField>
          <StyledField>
            <Input
              label={t('register.fields.measurement-and-weighing.measurement')}
              onChange={handleChangeMeasurement}
              value={measurement ?? ''}
              placeholder='Medida em CM'
              name="measurement"
              mask='#### CM'
              type='number'
            />
          </StyledField>
          <StyledDescriptionField>
            <TextField
              value={description}
              onChange={handleChangeDescription}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae laoreet nisi. Cras sed libero consectetur, sodales lorem at, rutrum nulla."
              label={t('register.fields.description')}
              name="description"
            />
          </StyledDescriptionField>
        </StyledForm>
      )}
    </StyledContainer>
  )
}
