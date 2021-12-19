import { createMinWidthMediaQuery } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledButton = styled.div`
  margin-top: 15px;

  ${createMinWidthMediaQuery(`
    width: 60%;
    margin: 0 auto;
    padding-top: 20px;
  `)}
`
