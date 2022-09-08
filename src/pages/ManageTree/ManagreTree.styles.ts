import { Colors, DEFAULT_BORDER_RADIUS, MAIN_FONT } from '@cig-platform/ui'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const TreeItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-family: ${MAIN_FONT};
  position: absolute;
`

export const TreeItem = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  background-color: ${Colors.LightGrey};
  width: 100px;
  border-radius: ${DEFAULT_BORDER_RADIUS};
  padding: 10px;
`

export const TreeName = styled.span`
  width: 100%;
  text-align: center;
`

export const TreeGender = styled.span``

export const TreeInfo = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 10px;
  margin-top: 5px;
`

export const TreeTail = styled.span``

export const TreeDewlap = styled.span``

export const TreeCrest = styled.span``
