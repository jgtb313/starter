import { screen } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'

import { Loader } from './Loader'
import { LoaderProps } from './Loader.types'

import { render } from '@/tests'

const renderComponent = ({ ...props }: LoaderProps) => {
  return render({
    children: <Loader data-testid="component" {...props} />
  })
}

describe('<Loader />', () => {
  it('should <Loader /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
