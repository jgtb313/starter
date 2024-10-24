import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Status } from './Status'
import { StatusLabels, StatusColors, StatusEnum } from './Status.types'

import { render } from '@/tests'

describe('<Status />', () => {
  it.each(Object.keys(StatusLabels) as StatusEnum[])('should <Status /> render the correct label and color for %s variant', (variant) => {
    render({
      children: <Status variant={variant} />
    })

    const expectedLabel = StatusLabels[variant]
    const expectedColor = StatusColors[variant]

    const labelText = screen.getByText(expectedLabel)
    expect(labelText).toBeInTheDocument()

    const badgeElement = labelText.closest('.mantine-Badge-root')
    expect(badgeElement).toHaveStyle(`--badge-color: var(--mantine-color-${expectedColor}-outline)`)
  })
})
