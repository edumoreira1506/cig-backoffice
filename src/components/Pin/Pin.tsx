import React from 'react'
import { BsFillPinFill } from 'react-icons/bs'

import { StyledContainer } from './Pin.styles'

interface PinProps {
  lat: number;
  lng: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Pin(props: PinProps) {
  return (
    <StyledContainer>
      <BsFillPinFill />
    </StyledContainer>
  )
}
