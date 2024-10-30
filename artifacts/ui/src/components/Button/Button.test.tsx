import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Button } from './Button'
import { ButtonProps } from './Button.types'

const renderComponent = ({ ...props }: ButtonProps) => {
  return render(
    <TestProvider>
      <Button data-testid="component" {...props}>
        Button
      </Button>
    </TestProvider>,
  )
}

describe('<Button />', () => {
  it.skip('should <Button /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })

  it('should <Button /> render properly as Link', () => {
    renderComponent({
      href: 'https://www.google.com.br',
    })

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })

  it('should <Button /> render properly with tooltip', () => {
    renderComponent({
      tooltip: 'Tooltip',
    })

    const el = screen.queryByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
