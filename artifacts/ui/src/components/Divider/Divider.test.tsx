import { screen } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'

import { Divider } from './Divider'
import { DividerProps } from './Divider.types'

import { render } from '@/tests'

const renderComponent = ({ ...props }: DividerProps) => {
  return render({
    children: <Divider data-testid="component" {...props} />
  })
}

describe('<Divider />', () => {
  it('should <Divider /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
