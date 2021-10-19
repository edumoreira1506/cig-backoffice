import styled from 'styled-components'
import { Colors, createMinWidthMediaQuery } from '@cig-platform/ui'

export const StyledForm = styled.form`
  width: 100%;
  margin-top: 20px;

  textarea {
    height: 100px;
  }

  textarea, input {
    width: 96%;

    ${createMinWidthMediaQuery(`
      width: 98%;
    `)}
  }
`

export const StyledFormField = styled.div`
  margin-bottom: 15px;
  width: 100%;
`

export const StyledSubtitle = styled.p`
  font-weight: bold;
  margin: 55px 0 20px 0;
  color: ${Colors.DarkGrey};
`
