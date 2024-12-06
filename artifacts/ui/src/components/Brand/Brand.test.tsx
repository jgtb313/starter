import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Brand } from './Brand'
import { BrandProps } from './Brand.types'

const renderComponent = ({ ...props }: BrandProps) => {
  return render(
    <TestProvider>
      <Brand data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Brand />', () => {
  it('should <Brand /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
