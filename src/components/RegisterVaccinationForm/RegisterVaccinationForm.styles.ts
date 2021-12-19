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
  flex-wrap: wrap;
`

export const StyledField = styled.div`
  width: 30%;

  ${createMinWidthMediaQuery(`
    width: 32%;
  `)}
`

export const StyledDescriptionField = styled.div`
  width: 100%;
  margin-top: 15px;
`

export const StyledTable = styled.div`
  margin-bottom: 15px;
`

export const StyledTitle = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 1.5em;
`
