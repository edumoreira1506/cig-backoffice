import styled from 'styled-components'
import { createMinWidthMediaQuery, MAIN_FONT } from '@cig-platform/ui'

export const StyledContainer = styled.main`
  font-family: ${MAIN_FONT};
  margin: 0 auto;
  width: calc(100% - 15px);

  ${createMinWidthMediaQuery(`
    width: 80%;
  `)}
`
