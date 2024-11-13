import { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Icon } from '../Icon'
import { ActionIcon } from './ActionIcon'
import { ActionIconProps } from './ActionIcon.types'

const renderComponent = ({ ...props }: PropsWithChildren<ActionIconProps>) => {
  return render(
    <TestProvider>
      <ActionIcon data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<ActionIcon />', () => {
  it('should render properly', () => {
    renderComponent({
      children: <Icon name="Heart" />,
    })

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })

  it('should render as a link when href is provided', () => {
    renderComponent({ children: <Icon name="Heart" />, href: 'https://example.com' })

    const el = screen.getByTestId('component')

    expect(el.tagName).toBe('A')
    expect(el).toHaveAttribute('href', 'https://example.com')
  })

  it('should render as a button when href is not provided', () => {
    renderComponent({ children: <Icon name="Heart" /> })

    const el = screen.getByTestId('component')

    expect(el.tagName).toBe('BUTTON')
  })

  it('should render the heart icon with correct attributes', () => {
    renderComponent({ children: <Icon name="Heart" /> })

    const icon = screen.getByTestId('component').querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('tabler-icon-heart')
  })
})
