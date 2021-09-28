import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Select } from '@cig-platform/ui'
import { useDebouncedEffect } from '@cig-platform/hooks'

import { setAddressField } from '../../contexts/EditBreederContext/editBreederActions'
import { useEditBreederSelector, useEditBreederDispatch } from '../../contexts/EditBreederContext/EditBreederContext'
import { selectAddressStreet, selectAddressNumber, selectAddressProvince, selectAddressZipcode, selectAddressCity } from '../../contexts/EditBreederContext/editBreederSelectors'
import { AVAILABLE_PROVINCES } from '../../constants/breeder'
import CepService from '../../services/CepService'

import { StyledContainer, StyledCity, StyledNumber, StyledProvince, StyledStreet, StyledZipcode } from './EditBreederFormAddress.styles'

const selectOptions = AVAILABLE_PROVINCES.map(province => ({
  label: province,
  value: province
}))

export default function EditBreederFormAddress() {
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()

  const street = useEditBreederSelector(selectAddressStreet)
  const number = useEditBreederSelector(selectAddressNumber)
  const province = useEditBreederSelector(selectAddressProvince)
  const zipcode = useEditBreederSelector(selectAddressZipcode)
  const city = useEditBreederSelector(selectAddressCity)

  const dispatch = useEditBreederDispatch()

  const handleChangeStreet = useCallback((newStreet: string | number) => {
    dispatch(setAddressField('street', newStreet.toString()))
  }, [dispatch])

  const handleChangeNumber = useCallback((newNumber: string | number) => {
    dispatch(setAddressField('number', newNumber.toString()))
  }, [dispatch])

  const handleChangeProvince = useCallback((newProvince: string | number) => {
    dispatch(setAddressField('province', newProvince.toString()))
  }, [dispatch])

  const handleChangeZipcode = useCallback((newZipcode: string | number) => {
    dispatch(setAddressField('zipcode', newZipcode.toString()))
  }, [dispatch])

  const handleChangeCity = useCallback((newCity: string | number) => {
    dispatch(setAddressField('city', newCity))
  }, [dispatch])

  useDebouncedEffect(() => {
    (async () => {
      if (!zipcode) return

      setIsLoading(true)

      const addressInfo = await CepService.getInfo(zipcode)

      setIsLoading(false)

      if (!addressInfo) return

      handleChangeCity(addressInfo.localidade)
      handleChangeProvince(addressInfo.uf)
      handleChangeStreet(addressInfo.logradouro)
    })()
  }, 500, [zipcode, handleChangeStreet, handleChangeCity, handleChangeProvince])

  return (
    <StyledContainer>
      <StyledZipcode>
        <Input
          type="number"
          value={zipcode}
          mask="#####-###"
          onChange={handleChangeZipcode}
          label={t('breeder.fields.address.zipcode')}
          placeholder="00000-000"
          isLoading={isLoading}
        />
      </StyledZipcode>
      <StyledStreet>
        <Input
          value={street}
          onChange={handleChangeStreet}
          label={t('breeder.fields.address.street')}
          placeholder="Rua José da Silva"
        />
      </StyledStreet>
      <StyledNumber>
        <Input
          type="number"
          value={number}
          onChange={handleChangeNumber}
          label={t('breeder.fields.address.number')}
          placeholder="123456"
        />
      </StyledNumber>
      <StyledProvince>
        <Select
          options={selectOptions}
          label={t('breeder.fields.address.province')}
          value={province}
          onChange={handleChangeProvince}
          showEmptyOption
          emptyOptionText={t('common.select-the-province')}
        />
      </StyledProvince>
      <StyledCity>
        <Input
          value={city}
          onChange={handleChangeCity}
          label={t('breeder.fields.address.city')}
          placeholder="São Paulo"
        />
      </StyledCity>
    </StyledContainer>
  )
}
