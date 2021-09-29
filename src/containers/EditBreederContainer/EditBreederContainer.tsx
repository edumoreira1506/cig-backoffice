import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { IBreeder } from '@cig-platform/types'

import EditBreederForm from '../../components/EditBreederForm/EditBreederForm'
import { useEditBreederDispatch } from '../../contexts/EditBreederContext/EditBreederContext'
import { setDescription, setFoundationDate, setName, setAddressField, setId } from '../../contexts/EditBreederContext/editBreederActions'
import useEditBreeder from '../../hooks/useEditBreeder'
import { success } from '../../utils/alert'
import { Routes } from '../../constants/routes'

export interface EditBreederContainerProps {
  breeder: IBreeder;
}

export default function EditBreederContainer({ breeder }: EditBreederContainerProps) {
  const history = useHistory()

  const { t } = useTranslation()

  const handleSuccess = useCallback(() => {
    success(t('common.updated'), t, () => history.push(Routes.Home))
  }, [t, history])

  const editBreeder = useEditBreeder({ onSuccess: handleSuccess })

  const dispatch = useEditBreederDispatch()

  useEffect(() => {
    dispatch(setName(breeder.name))
    dispatch(setFoundationDate(breeder?.foundationDate?.toString() ?? ''))
    dispatch(setDescription(breeder?.description ?? ''))
    dispatch(setAddressField('city', breeder?.address?.city ?? ''))
    dispatch(setAddressField('number', breeder?.address?.number ?? ''))
    dispatch(setAddressField('province', breeder?.address?.province ?? ''))
    dispatch(setAddressField('zipcode', breeder?.address?.zipcode ?? ''))
    dispatch(setAddressField('street', breeder?.address?.street ?? ''))
    dispatch(setId(breeder.id))
  }, [breeder])

  return (
    <EditBreederForm onSubmit={editBreeder} />
  )
}
