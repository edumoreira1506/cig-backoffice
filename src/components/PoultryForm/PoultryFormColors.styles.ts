import styled from 'styled-components'
import { createMinWidthMediaQuery } from '@cig-platform/ui'

export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
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
