import { screen } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'

import { ActionButton } from './ActionButton'
import { ActionButtonProps } from './ActionButton.types'

import { render } from '@/tests'
import { Icon } from '../Icon'

const renderComponent = ({ ...props }: ActionButtonProps) => {
  return render({
    children: (
      <ActionButton data-testid="component" {...props}>
        <Icon name="Heart" />
      </ActionButton>
    ),
  })
}

describe('<ActionButton />', () => {
  it('should <ActionButton /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
