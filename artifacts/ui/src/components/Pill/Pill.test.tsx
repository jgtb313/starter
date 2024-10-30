import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Pill } from './Pill'
import { PillProps } from './Pill.types'

const renderComponent = ({ ...props }: PillProps) => {
  return render(
    <TestProvider>
      <Pill data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Pill />', () => {
  it('should <Pill /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
