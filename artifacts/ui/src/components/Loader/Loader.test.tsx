import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Loader } from './Loader'
import { LoaderProps } from './Loader.types'

const renderComponent = ({ ...props }: LoaderProps) => {
  return render(
    <TestProvider>
      <Loader data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Loader />', () => {
  it('should <Loader /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
