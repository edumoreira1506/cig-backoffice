import styled from 'styled-components'
import { Colors, createMinWidthMediaQuery } from '@cig-platform/ui'

export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

export const StyledPicker = styled.div`
  margin-top: 12px;
`

export const StyledLabel = styled.label`
  color: ${Colors.Black};
  font-weight: lighter;
`

export const StyledItem = styled.div`
  width: 100%;
  margin-bottom: 30px;

  ${createMinWidthMediaQuery(`
    width: 33%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `)}
`
