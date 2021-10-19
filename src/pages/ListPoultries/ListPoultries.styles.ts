import { createMinWidthMediaQuery } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledList = styled.ul``

export const StyledItem = styled.li``

export const StyledNewPoultry = styled.div`
  ${createMinWidthMediaQuery(`
    width: 50%;
    margin: 0 auto;
  `)}
`
