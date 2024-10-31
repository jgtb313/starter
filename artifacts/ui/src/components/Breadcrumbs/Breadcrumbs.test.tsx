import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TestProvider } from '@/tests'
import { Breadcrumbs } from './Breadcrumbs'
import { BreadcrumbsProps } from './Breadcrumbs.types'

const renderComponent = (props: BreadcrumbsProps) => {
  return render(
    <TestProvider>
      <Breadcrumbs data-testid="component" {...props} />
    </TestProvider>,
  )
}

describe('<Breadcrumbs />', () => {
  it('should render properly with a single item', () => {
    renderComponent({
      items: [{ label: 'Dashboard' }],
    })

    const el = screen.getByTestId('component')
    expect(el).toBeInTheDocument()
    expect(el.children.length).toBe(1)
    expect(el).toHaveTextContent('Dashboard')
  })

  it('should render multiple items correctly', () => {
    renderComponent({
      items: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings', href: '/settings' },
      ],
    })

    const el = screen.getByTestId('component')
    const links = el.querySelectorAll('a')

    expect(links.length).toBe(2)
    expect(links[0]).toHaveAttribute('href', '/dashboard')
    expect(links[0]).toHaveTextContent('Dashboard')
    expect(links[1]).toHaveAttribute('href', '/settings')
    expect(links[1]).toHaveTextContent('Settings')
  })

  it('should render items without href as plain text', () => {
    renderComponent({
      items: [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }],
    })

    const el = screen.getByTestId('component')
    const links = el.querySelectorAll('a')
    const texts = el.querySelectorAll('span')

    expect(links.length).toBe(1)
    expect(texts.length).toBe(1)
    expect(texts[0]).toHaveTextContent('Settings')
  })

  it('should render correct number of items with correct labels', () => {
    renderComponent({
      items: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Contact' }],
    })

    const el = screen.getByTestId('component')
    expect(el.children.length).toBe(5)

    const labels = Array.from(el.children).map((child) => child.textContent)
    expect(labels).toEqual(['Home', '/', 'About', '/', 'Contact'])
  })
})
