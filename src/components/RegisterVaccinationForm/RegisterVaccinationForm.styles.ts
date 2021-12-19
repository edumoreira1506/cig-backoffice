import { createMinWidthMediaQuery } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100%;

  ${createMinWidthMediaQuery(`
    width: 60%;
    margin: 0 auto;
  `)}
`

export const StyledButton = styled.div`
  ${createMinWidthMediaQuery(`
    width: 60%;
    margin: 0 auto;
  `)}
`

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`

export const StyledField = styled.div`
  width: 30%;

  ${createMinWidthMediaQuery(`
    width: 32%;
  `)}
`
