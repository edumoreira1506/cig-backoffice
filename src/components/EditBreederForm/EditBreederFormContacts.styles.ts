import { Colors, DEFAULT_BORDER_RADIUS } from '@cig-platform/ui'
import styled from 'styled-components'

export const StyledContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const StyledContact = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
`

export const StyledContactValue = styled.div`
  width: 40%;
`

export const StyledContactType = styled.div`
  width: 40%;
`

export const StyledActions = styled.div`
  width: 10%;

  svg {
    color: ${Colors.White};
    background-color: ${Colors.BlackTransparent};
    border-radius: ${DEFAULT_BORDER_RADIUS};
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`
