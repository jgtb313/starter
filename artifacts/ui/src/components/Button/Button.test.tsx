import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { Button } from './Button'
import { ButtonProps } from './Button.types'

import { render } from '@/tests'

const renderComponent = ({ ...props }: ButtonProps) => {
  return render({
    children: (
      <Button data-testid="component" {...props}>
        Button
      </Button>
    )
  })
}

describe('<Button />', () => {
  it.skip('should <Button /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })

  // it('should <Button /> render properly as Link', () => {
  //   renderComponent({
  //     href: 'https://www.google.com.br',
  //     link: true
  //   })

  //   const el = screen.getByTestId('component')

  //   expect(el).toBeInTheDocument()
  // })

  // it('should <Button /> render properly with tooltip', () => {
  //   renderComponent({
  //     tooltip: 'Tooltip'
  //   })

  //   const el = screen.queryByTestId('button-tooltip')

  //   console.log({
  //     el
  //   })

  //   expect(el).toBeInTheDocument()
  // })
})
