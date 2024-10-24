import { screen } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'

import { Avatar } from './Avatar'
import { AvatarProps } from './Avatar.types'

import { render } from '@/tests'

const renderComponent = ({ ...props }: AvatarProps) => {
  return render({
    children: <Avatar data-testid="component" {...props} />
  })
}

describe('<Avatar />', () => {
  it('should <Avatar /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })
})
