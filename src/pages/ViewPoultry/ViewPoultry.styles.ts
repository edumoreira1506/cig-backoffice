import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  .transfer-modal {
    position: absolute !important;
    inset: 40px;
    border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;

    .ReactModal__Content--after-open {
      transform: translateY(60vh) !important;
      height: 40vh !important;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export const StyledContainer = styled.div`
`

export const StyledTransferButton = styled.div`
  margin-top: 10px;
`

export const StyledAutocomplete = styled.div`
  & > div {
    z-index: 9;
  }
`

export const StyledTransferCheckbox = styled.div`
  margin-top: 10px;

  & > div {
    align-items: flex-start;
  }
`
