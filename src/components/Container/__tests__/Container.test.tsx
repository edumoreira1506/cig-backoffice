import React from 'react'
import { render, screen } from '@testing-library/react'

import Container from '../Container'

const DEFAULT_PROPS = {
  children: 'I am the children!'
}

describe('Container', () => {
  it('renders the children', () => {
    const children = 'Children'

    render(<Container {...DEFAULT_PROPS}>{children}</Container>)

    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
