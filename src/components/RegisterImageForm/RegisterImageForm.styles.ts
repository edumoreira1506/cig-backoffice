import { createMinWidthMediaQuery } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledForm = styled.div`
  width: 100%;

  ${createMinWidthMediaQuery(`
    width: 80%;
    margin: 0 auto;
  `)}
`

export const StyledFormField = styled.div`
  margin-bottom: 15px;
  width: 100%;
`
