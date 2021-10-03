import styled from 'styled-components'
import { Colors, createMinWidthMediaQuery, MAIN_FONT } from '@cig-platform/ui'

export const StyledContainer = styled.section`
  font-family: ${MAIN_FONT};
  margin: 0 auto;
  width: calc(100% - 15px);

  ${createMinWidthMediaQuery(`
    width: 50%;
  `)}
`

export const StyledDescription = styled.p`
  font-size: 1em;
  margin: 8px 0 15px 0;
  font-weight: 100;
  color: ${Colors.Black};
`

export const StyledTitle = styled.h3`
  margin: 0;
  font-size: 2em;
  text-align: center;
`
