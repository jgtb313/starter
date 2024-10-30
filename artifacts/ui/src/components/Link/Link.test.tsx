import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Link } from './Link'
import { LinkProps } from './Link.types'

const renderComponent = ({ ...props }: LinkProps) => {
  return render(
    <TestProvider>
      <Link data-testid="component" {...props}>
        Link
      </Link>
    </TestProvider>,
  )
}

describe('<Link />', () => {
  it('should <Link /> render properly', () => {
    renderComponent({
      href: 'https://www.google.com',
    })

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
