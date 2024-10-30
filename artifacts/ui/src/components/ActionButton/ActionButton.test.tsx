import { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Icon } from '../Icon'
import { ActionButton } from './ActionButton'
import { ActionButtonProps } from './ActionButton.types'

const renderComponent = ({ ...props }: PropsWithChildren<ActionButtonProps>) => {
  return render(
    <TestProvider>
      <ActionButton data-testid="component" {...props}>
        <Icon name="Heart" />
      </ActionButton>
    </TestProvider>,
  )
}

describe('<ActionButton />', () => {
  it('should render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })

  it('should render as a link when href is provided', () => {
    renderComponent({ href: 'https://example.com' })

    const el = screen.getByTestId('component')

    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', 'https://example.com')
  })

  it('should render as a button when href is not provided', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el.tagName).toBe('BUTTON')
  })

  it('should render the heart icon with correct attributes', () => {
    renderComponent({})

    const icon = screen.getByTestId('component').querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('lucide-heart')
  })
})
