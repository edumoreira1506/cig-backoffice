import styled from 'styled-components'
import { Colors } from '@cig-platform/ui'

export const StyledForm = styled.form`
  width: 100%;
  margin-top: 20px;

  textarea {
    height: 100px;
  }
`

export const StyledFormField = styled.div`
  margin-bottom: 15px;
  width: 100%;
  margin-top: 15px;
`

export const StyledSubtitle = styled.p`
  font-weight: bold;
  margin: 55px 0 20px 0;
  color: ${Colors.DarkGrey};
`
