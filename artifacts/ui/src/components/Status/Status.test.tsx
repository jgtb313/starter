import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Status } from './Status'
import { StatusProps, StatusLabels, StatusColors, StatusEnum } from './Status.types'

const renderComponent = ({ ...props }: StatusProps) => {
  return render(
    <TestProvider>
      <Status data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Status />', () => {
  it.each(Object.keys(StatusLabels) as StatusEnum[])('should <Status /> render the correct label and color for %s variant', (variant) => {
    renderComponent({ variant })

    const expectedLabel = StatusLabels[variant]
    const expectedColor = StatusColors[variant]

    const labelText = screen.getByText(expectedLabel)
    expect(labelText).toBeInTheDocument()

    const badgeElement = labelText.closest('.mantine-Badge-root')
    expect(badgeElement).toHaveStyle(`--badge-color: var(--mantine-color-${expectedColor}-outline)`)
  })
})
