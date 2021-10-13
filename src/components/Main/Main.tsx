import React, { ReactNode } from 'react'

import { StyledContainer } from './Main.styles'

export interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}
