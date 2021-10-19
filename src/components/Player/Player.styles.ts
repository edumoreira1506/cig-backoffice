import styled from 'styled-components'
import { createMinWidthMediaQuery } from '@cig-platform/ui'

export const StyledContainer = styled.div`
  margin: 15px 0;
  height: 200px;
  width: 100%;

  ${createMinWidthMediaQuery(`
    width: 600px;
    height: 350px;
    margin: 0 auto;
    padding: 15px 0;
  `)}

  & > div {
    width: 100% !important;
    height: 100% !important;
  }
`
