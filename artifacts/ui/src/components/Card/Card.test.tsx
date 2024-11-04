import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Card } from './Card'
import { CardProps } from './Card.types'

const renderComponent = ({ ...props }: CardProps) => {
  return render(
    <TestProvider>
      <Card data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Card />', () => {
  it('should <Card /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
