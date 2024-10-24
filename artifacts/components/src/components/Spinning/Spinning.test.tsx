import { screen } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'

import { Spinning } from './Spinning'
import { SpinningProps } from './Spinning.types'

import { render } from '@/tests'

const renderComponent = ({ ...props }: SpinningProps) => {
  return render({
    children: <Spinning data-testid="component" {...props} />
  })
}

describe('<Spinning />', () => {
  it('should <Spinning /> render properly when the loading prop is set to true', () => {
    renderComponent({ loading: true })

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })

  it('should <Spinning /> render properly when the loading prop is set to false', () => {
    renderComponent({ loading: false })

    const el = screen.queryByTestId('component')

    expect(el).not.toBeInTheDocument()
  })
})
