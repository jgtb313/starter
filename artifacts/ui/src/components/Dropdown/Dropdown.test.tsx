import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Dropdown } from './Dropdown'
import { DropdownProps } from './Dropdown.types'

const renderComponent = ({ ...props }: DropdownProps) => {
  return render(
    <TestProvider>
      <Dropdown data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Dropdown />', () => {
  it('should <Dropdown /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
