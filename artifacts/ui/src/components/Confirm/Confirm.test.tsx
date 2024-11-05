import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { confirm } from './Confirm'

const renderComponent = () => {
  return render(<TestProvider />)
}

describe('<Confirm />', () => {
  it('should render <Confirm /> modal properly', async () => {
    renderComponent()

    confirm({ title: 'Title', description: 'Description' })

    const el = await screen.findByTestId('confirm')

    expect(el).toBeInTheDocument()
  })
})
