import React from 'react'

import { StyledContainer } from './RegisterVaccinationForm.styles'

export interface RegisterVaccinationFormProps {
  title: string;
}

export default function RegisterVaccinationForm({ title }: RegisterVaccinationFormProps) {
  return (
    <StyledContainer title={title}>RegisterVaccionationForm</StyledContainer>
  )
}
