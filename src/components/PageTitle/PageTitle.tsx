import React, { ReactNode } from 'react'

import { StyledContainer } from './PageTitle.styles'

export interface PageTitleProps {
  children: ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}
