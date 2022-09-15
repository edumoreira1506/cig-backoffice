import { createMinWidthMediaQuery } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledNewPoultry = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }
  
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
