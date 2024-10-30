import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Avatar } from './Avatar'
import { AvatarProps } from './Avatar.types'

const renderComponent = ({ ...props }: AvatarProps) => {
  return render(
    <TestProvider>
      <Avatar data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Avatar />', () => {
  it('should <Avatar /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
