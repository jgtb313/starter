import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useInterval } from '@starter/use-hooks'

import { CacheProvider } from './use-cache.provider'
import { cacheStore, CacheStore } from './use-cache.store'

vi.mock('@starter/use-hooks', () => ({
  useInterval: vi.fn(),
}))

vi.mock('./use-cache.store', () => ({
  cacheStore: {
    getState: vi.fn(() => ({
      data: {},
      remove: vi.fn(),
    })),
  },
}))

describe('CacheProvider', () => {
  let mockStorage: Storage

  const TestChild = () => <div>Storage</div>

  beforeEach(() => {
    vi.resetAllMocks()

    mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders children correctly', () => {
    render(
      <CacheProvider storage={mockStorage}>
        <TestChild />
      </CacheProvider>,
    )

    expect(screen.getByText('Storage')).toBeInTheDocument()
  })

  it('sets up interval for garbage collection', () => {
    render(
      <CacheProvider storage={mockStorage}>
        <TestChild />
      </CacheProvider>,
    )

    expect(useInterval).toHaveBeenCalledWith(expect.any(Function), 5000)
  })

  it('removes expired items through garbage collection', () => {
    const mockRemove = vi.fn()
    const mockCache = {
      data: {
        key1: { ttl: Date.now() - 1000, data: 'value1' },
        key2: { ttl: Date.now() + 1000, data: 'value2' },
      },
      get: vi.fn(),
      set: vi.fn(),
      remove: mockRemove,
    }
    vi.mocked((cacheStore as CacheStore).getState).mockReturnValueOnce(mockCache)

    render(
      <CacheProvider storage={mockStorage}>
        <TestChild />
      </CacheProvider>,
    )

    const intervalCallback = vi.mocked(useInterval).mock.calls[0][0]
    intervalCallback()

    expect(mockRemove).toHaveBeenCalledTimes(1)
    expect(mockRemove).toHaveBeenCalledWith('key1')
  })
})
