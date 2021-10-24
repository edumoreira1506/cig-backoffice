import { createMinWidthMediaQuery } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 15px;

  ${createMinWidthMediaQuery(`
    margin-bottom: 30px;
  `)}
`

export const StyledStreet = styled.div`
  width: 100%;
  margin-bottom: 10px;

  ${createMinWidthMediaQuery(`
    width: calc(50% - 4px);
  `)}
`

export const StyledNumber = styled.div`
  width: 35%;
  margin-bottom: 10px;

  ${createMinWidthMediaQuery(`
    width: calc(30% - 5px);
  `)}
`

export const StyledZipcode = styled.div`
  width: 100%;
  margin-bottom: 10px;

  ${createMinWidthMediaQuery(`
    width: calc(50% - 4px);
  `)}
`

export const StyledCity = styled.div`
  width: 100%;
  margin-bottom: 10px;

  ${createMinWidthMediaQuery(`
    width: calc(40% - 5px);
  `)}
`

export const StyledProvince = styled.div`
  width: 60%;
  margin-bottom: 10px;

  ${createMinWidthMediaQuery(`
    width: calc(30% - 5px);
  `)}
`

export const StyledMapContainer = styled.div`
  height: 500px;
  width: 100%;
`
