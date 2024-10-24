import { screen } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'

import { Pill } from './Pill'
import { PillProps } from './Pill.types'

import { render } from '@/tests'

const renderComponent = ({ ...props }: PillProps) => {
  return render({
    children: <Pill data-testid="component" {...props} />
  })
}

describe('<Pill />', () => {
  it('should <Pill /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
