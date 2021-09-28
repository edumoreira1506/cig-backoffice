import React, { useEffect } from 'react'
import { IBreeder } from '@cig-platform/types'

import EditBreederForm from '../../components/EditBreederForm/EditBreederForm'
import { useEditBreederDispatch } from '../../contexts/EditBreederContext/EditBreederContext'
import { setDescription, setFoundationDate, setName, setAddressField } from '../../contexts/EditBreederContext/editBreederActions'

export interface EditBreederContainerProps {
  breeder: IBreeder;
}

export default function EditBreederContainer({ breeder }: EditBreederContainerProps) {
  const handleSubmit = (breeder: Partial<IBreeder>) => console.log(breeder)

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
  }, [breeder])

  return (
    <EditBreederForm onSubmit={handleSubmit} />
  )
}
