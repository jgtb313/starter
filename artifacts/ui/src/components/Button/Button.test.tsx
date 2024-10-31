import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Button } from './Button'
import { ButtonProps } from './Button.types'

const renderComponent = (props: ButtonProps) => {
  return render(
    <TestProvider>
      <Button data-testid="component" {...props}>
        Button
      </Button>
    </TestProvider>,
  )
}

describe('<Button />', () => {
  it('should render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent('Button')
  })

  it('should render as a link when href is provided', () => {
    renderComponent({
      href: 'https://www.google.com.br',
    })

    const el = screen.getByTestId('component')

    expect(el).toHaveAttribute('href', 'https://www.google.com.br')
    expect(el).toHaveTextContent('Button')
  })

  it('should render with tooltip', async () => {
    const user = userEvent.setup()

    renderComponent({
      tooltip: 'Tooltip',
    })

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()

    user.hover(el)

    await waitFor(() => {
      expect(el).toHaveAttribute('aria-describedby')
    })
  })

  it('should render as a button when no href is provided', () => {
    renderComponent({
      type: 'button',
    })

    const el = screen.getByTestId('component')

    expect(el).toHaveAttribute('type', 'button')
  })

  it('should render with block style when block prop is true', () => {
    renderComponent({
      block: true,
    })

    const el = screen.getByTestId('component')

    expect(el).toHaveAttribute('data-block', 'true')
  })
})
