import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Button, Tabs } from '@cig-platform/ui'
import { RegisterTypeEnum } from '@cig-platform/enums'

import { useRegisterDispatch, useRegisterSelector } from 'contexts/RegisterContext/RegisterContext'
import { setType } from 'contexts/RegisterContext/registerActions'
import RegisterImageForm from 'components/RegisterImageForm/RegisterImageForm'
import RegisterVaccinationForm from 'components/RegisterVaccinationForm/RegisterVaccinationForm'
import RegisterMeasurementAndWeighingForm from 'components/RegisterMeasurementAndWeighingForm/RegisterMeasurementAndWeighingForm'
import useSaveRegister from 'hooks/useSaveRegister'
import {
  selectType,
  selectDescription,
  selectFiles,
  selectVaccination,
  selectMeasurementAndWeighing,
} from 'contexts/RegisterContext/registerSelectors'
import { Routes } from 'constants/routes'
import { success } from 'utils/alert'

import { StyledButton } from './NewRegisterContainer.styles'
import stringToDate from 'formatters/stringToDate'

const registerTypes = [
  RegisterTypeEnum.Images,
  RegisterTypeEnum.MeasurementAndWeighing,
  RegisterTypeEnum.Vaccination
]

export default function NewRegisterContainer() {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const type = useRegisterSelector(selectType)
  const description = useRegisterSelector(selectDescription)
  const files = useRegisterSelector(selectFiles)
  const vaccination = useRegisterSelector(selectVaccination)
  const measurementAndWeighing = useRegisterSelector(selectMeasurementAndWeighing)

  const dispatch = useRegisterDispatch()

  const handleChangeType = useCallback((newTypeIndex: number) => {
    dispatch(setType(registerTypes[newTypeIndex]))
  }, [dispatch])

  const handleSuccess = useCallback(() => {
    success(t('common.saved'), t, () => navigate(Routes.Home))
  }, [t, navigate])

  const saveRegister = useSaveRegister({ onSuccess: handleSuccess })

  const handleSave = useCallback(() => {
    switch (type) {
    case RegisterTypeEnum.Images:
      saveRegister({ description, type }, files.map(file => file.file))
      break
    case RegisterTypeEnum.Vaccination:
      saveRegister({
        description,
        type,
        date: stringToDate(vaccination.date),
        metadata: { dose: vaccination.dose, name: vaccination.name }
      })
      break
    case RegisterTypeEnum.MeasurementAndWeighing:
      saveRegister({
        description,
        type,
        date: stringToDate(measurementAndWeighing.date),
        metadata: { weight: measurementAndWeighing.weight, measurement: measurementAndWeighing.measurement }
      })
      break
    }
  }, [saveRegister, type, description, files, vaccination, measurementAndWeighing])

  return (
    <>
      <Tabs setTab={handleChangeType}>
        <RegisterImageForm title={t('register.fields.type.images')} />
        <RegisterMeasurementAndWeighingForm title={t('register.fields.type.measurement-and-weighing')} />
        <RegisterVaccinationForm title={t('register.fields.type.vaccination')} />
      </Tabs>
      <StyledButton>
        <Button onClick={handleSave}>
          {t('common.save')}
        </Button>
      </StyledButton>
    </>
  )
}
