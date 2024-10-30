import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Rating } from './Rating'
import { RatingProps } from './Rating.types'

const renderComponent = ({ ...props }: RatingProps) => {
  return render(
    <TestProvider>
      <Rating data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Rating />', () => {
  it('should <Rating /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
