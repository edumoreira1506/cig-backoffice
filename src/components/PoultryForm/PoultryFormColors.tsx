import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { PoultryColorEnum } from '@cig-platform/enums'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectColors } from 'contexts/PoultryContext/poultrySelectors'
import { setColor } from 'contexts/PoultryContext/poultryActions'

import { StyledContainer, StyledItem } from './PoultryFormColors.styles'
import { Select } from '@cig-platform/ui'


const availableColors = [
  {
    value: PoultryColorEnum.BLACK,
    label: 'Preto'
  },
  {
    value: PoultryColorEnum.WHITE,
    label: 'Branco'
  }
]

export default function PoultryFormColors() {
  const { t } = useTranslation()

  const colors = usePoultrySelector(selectColors)

  const dispatch = usePoultryDispatch()

  const handleChangePlumage = useCallback((newColor: string | number) => {
    dispatch(setColor(String(newColor), 'plumage'))
  }, [dispatch])

  const handleChangeShins =  useCallback((newColor: string | number) => {
    dispatch(setColor(String(newColor), 'shins'))
  }, [dispatch])

  const handleChangeEyes =  useCallback((newColor: string | number) => {
    dispatch(setColor(String(newColor), 'eyes'))
  }, [dispatch])

  return (
    <StyledContainer>
      <StyledItem>
        <Select
          options={availableColors}
          label={t('poultry.fields.colors.plumage')}
          value={colors.plumage ?? ''}
          onChange={handleChangePlumage}
          showEmptyOption
          emptyOptionText={t('common.select-the-color')}
          name="poultry-color-plumage"
        />
      </StyledItem>
      <StyledItem>
        <Select
          options={availableColors}
          label={t('poultry.fields.colors.shins')}
          value={colors.shins ?? ''}
          onChange={handleChangeShins}
          name="poultry-color-shins"
          showEmptyOption
          emptyOptionText={t('common.select-the-color')}
        />
      </StyledItem>
      <StyledItem>
        <Select
          options={availableColors}
          label={t('poultry.fields.colors.eyes')}
          value={colors.eyes ?? ''}
          onChange={handleChangeEyes}
          name="poultry-color-eyes"
          showEmptyOption
          emptyOptionText={t('common.select-the-color')}
        />
      </StyledItem>
    </StyledContainer>
  )
}
