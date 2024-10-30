import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Badge } from './Badge'
import { BadgeProps } from './Badge.types'

const renderComponent = ({ ...props }: BadgeProps) => {
  return render(
    <TestProvider>
      <Badge data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Badge />', () => {
  it('should <Badge /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
