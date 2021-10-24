import { createMinWidthMediaQuery } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledPoultriesCarousel = styled.div``

export const StyledPoultriesCarouselTitle = styled.p``

export const StyledNewPoultry = styled.div`
  ${createMinWidthMediaQuery(`
    width: 50%;
    margin: 0 auto;
  `)}
`
