import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Spinning } from './Spinning'
import { SpinningProps } from './Spinning.types'

const renderComponent = ({ ...props }: SpinningProps) => {
  return render(
    <TestProvider>
      <Spinning data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Spinning />', () => {
  it('should <Spinning /> render properly when the loading prop is set to true', () => {
    renderComponent({ loading: true })

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })

  it('should <Spinning /> render properly when the loading prop is set to false', () => {
    renderComponent({ loading: false })

    const el = screen.queryByTestId('component')

    expect(el).not.toBeInTheDocument()
  })
})
