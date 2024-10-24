import { screen } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'

import { Rating } from './Rating'
import { RatingProps } from './Rating.types'

import { render } from '@/tests'

const renderComponent = ({ ...props }: RatingProps) => {
  return render({
    children: <Rating data-testid="component" {...props} />
  })
}

describe('<Rating />', () => {
  it('should <Rating /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
