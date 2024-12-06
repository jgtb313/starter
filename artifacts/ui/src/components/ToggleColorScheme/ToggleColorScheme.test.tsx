import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { ToggleColorScheme } from './ToggleColorScheme'
import { ToggleColorSchemeProps } from './ToggleColorScheme.types'

const renderComponent = ({ ...props }: ToggleColorSchemeProps) => {
  return render(
    <TestProvider>
      <ToggleColorScheme data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<ToggleColorScheme />', () => {
  it('should <ToggleColorScheme /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
