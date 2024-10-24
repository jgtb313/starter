import { screen } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'

import { Badge } from './Badge'
import { BadgeProps } from './Badge.types'

import { render } from '@/tests'

const renderComponent = ({ ...props }: BadgeProps) => {
  return render({
    children: <Badge data-testid="component" {...props} />
  })
}

describe('<Badge />', () => {
  it('should <Badge /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
