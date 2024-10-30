import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Icon } from '../Icon'
import { ActionButton } from './ActionButton'
import { ActionButtonProps } from './ActionButton.types'

const renderComponent = ({ ...props }: ActionButtonProps) => {
  return render(
    <TestProvider>
      <ActionButton data-testid="component" {...props}>
        <Icon name="Heart" />
      </ActionButton>
    </TestProvider>,
  )
}

describe('<ActionButton />', () => {
  it('should <ActionButton /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
