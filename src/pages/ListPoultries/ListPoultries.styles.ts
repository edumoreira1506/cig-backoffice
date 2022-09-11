import { createMinWidthMediaQuery } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledNewPoultry = styled.div`
  ${createMinWidthMediaQuery(`
    width: 50%;
    margin: 0 auto;
  `)}
`

export const StyledPoultries = styled.div`
  overflow: hidden;

  a {
    color: inherit;
  }
`
