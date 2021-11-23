import { createMinWidthMediaQuery } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledContainer = styled.div``

export const StyledButton = styled.div`
  width: 100%;
  margin-bottom: 3px;

  ${createMinWidthMediaQuery(`
    width: 49%;
  `)}
`

export const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${createMinWidthMediaQuery(`
    flex-direction: row;
    justify-content: space-between;
  `)}
`
