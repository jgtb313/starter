import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { ActionIcon } from './ActionIcon'
import { ActionIconProps } from './ActionIcon.types'

const renderComponent = ({ ...props }: ActionIconProps) => {
  return render(
    <TestProvider>
      <ActionIcon data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<ActionIcon />', () => {
  it('should render properly', () => {
    renderComponent({
      icon: 'Heart',
    })

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })

  it('should render as a link when href is provided', () => {
    renderComponent({ icon: 'Heart', href: 'https://example.com' })

    const el = screen.getByTestId('component')

    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', 'https://example.com')
  })

  it('should render as a button when href is not provided', () => {
    renderComponent({ icon: 'Heart' })

    const el = screen.getByTestId('component')

    expect(el.tagName).toBe('BUTTON')
  })

  it('should render the heart icon with correct attributes', () => {
    renderComponent({ icon: 'Heart' })

    const icon = screen.getByTestId('component').querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('tabler-icon-heart')
  })
})
