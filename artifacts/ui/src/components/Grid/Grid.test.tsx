import { PropsWithChildren } from 'react'
import { screen } from '@testing-library/dom'
import { describe, it, expect } from 'vitest'

import { render } from '@/tests'
import { Grid } from './Grid'
import { GridProps } from './Grid.types'

const renderComponent = ({ ...props }: PropsWithChildren<GridProps>) => {
  return render({
    children: <Grid data-testid="component" {...props} />
  })
}

describe('<Grid />', () => {
  it('should <Grid /> render properly', () => {
    renderComponent({})

    const el = screen.getByTestId('component')

    expect(el).toBeInTheDocument()
  })

  describe('<Grid.Col />', () => {
    it('should <Grid.Col /> render properly', () => {
      renderComponent({
        children: <Grid.Col data-testid="component-col" />
      })

      const el = screen.getByTestId('component-col')

      expect(el).toBeInTheDocument()
    })
  })
})
