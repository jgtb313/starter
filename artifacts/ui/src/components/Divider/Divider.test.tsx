import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Divider } from './Divider'
import { DividerProps } from './Divider.types'

const renderComponent = ({ ...props }: DividerProps) => {
  return render(
    <TestProvider>
      <Divider data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Divider />', () => {
  it('should <Divider /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
