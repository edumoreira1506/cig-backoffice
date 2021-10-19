import React, { useCallback } from 'react'
import { SketchPicker, ColorResult } from 'react-color'
import { useTranslation } from 'react-i18next'

import { usePoultryDispatch, usePoultrySelector } from 'contexts/PoultryContext/PoultryContext'
import { selectColors } from 'contexts/PoultryContext/poultrySelectors'
import { setColor } from 'contexts/PoultryContext/poultryActions'

import { StyledContainer, StyledPicker, StyledLabel, StyledItem } from './NewPoultryFormColors.styles'

export default function NewPoultryFormColors() {
  const { t } = useTranslation()

  const colors = usePoultrySelector(selectColors)

  const dispatch = usePoultryDispatch()

  const handleChangePlumage = useCallback(({ hex }: ColorResult) => {
    dispatch(setColor(hex, 'plumage'))
  }, [dispatch])

  const handleChangeShins =  useCallback(({ hex }: ColorResult) => {
    dispatch(setColor(hex, 'shins'))
  }, [dispatch])

  const handleChangeEyes =  useCallback(({ hex }: ColorResult) => {
    dispatch(setColor(hex, 'eyes'))
  }, [dispatch])

  return (
    <StyledContainer>
      <StyledItem>
        <StyledLabel>{t('poultry.fields.colors.plumage')}</StyledLabel>
        <StyledPicker>
          <SketchPicker color={colors.plumage} onChange={handleChangePlumage} />
        </StyledPicker>
      </StyledItem>
      <StyledItem>
        <StyledLabel>{t('poultry.fields.colors.shins')}</StyledLabel>
        <StyledPicker>
          <SketchPicker color={colors.shins} onChange={handleChangeShins} />
        </StyledPicker>
      </StyledItem>
      <StyledItem>
        <StyledLabel>{t('poultry.fields.colors.eyes')}</StyledLabel>
        <StyledPicker>
          <SketchPicker color={colors.eyes} onChange={handleChangeEyes} />
        </StyledPicker>
      </StyledItem>
    </StyledContainer>
  )
}
