import React from 'react'
import ReactPlayer from 'react-player'

import { StyledContainer } from './Player.styles'

export interface PlayerProps {
  url: string;
  dataTestId?: string;
}

export default function Player({ url, dataTestId = '' }: PlayerProps) {
  return (
    <StyledContainer data-testid={dataTestId}>
      <ReactPlayer url={url} />
    </StyledContainer>
  )
}
