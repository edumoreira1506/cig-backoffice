import styled from 'styled-components'
import { createMinWidthMediaQuery } from '@cig-platform/ui'

export const StyledForm = styled.form`
  input {
    width: 96%;

    ${createMinWidthMediaQuery(`
      width: 98%;
    `)}
  }
`

export const StyledField = styled.div``
