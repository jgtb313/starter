import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useInterval } from '@starter/use-hooks'

import { CacheProvider } from './use-cache.provider'
import * as cacheStoreModule from './use-cache.store'

vi.mock('@starter/use-hooks', () => ({
  useInterval: vi.fn(),
}))

vi.mock('./use-cache.store', () => {
  let _cacheStore: any = null

  return {
    get cacheStore() {
      return _cacheStore
    },
    setCacheStorage: vi.fn((storage) => {
      _cacheStore = storage
    }),
    runCacheGarbageCollector: vi.fn(),
  }
})
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

  it('should call setCacheStorage if cacheStore is not set', () => {
    render(
      <CacheProvider storage={mockStorage}>
        <TestChild />
      </CacheProvider>,
    )

    expect(cacheStoreModule.setCacheStorage).toHaveBeenCalledWith(mockStorage)
  })

  it('should call useInterval with runCacheGarbageCollector and default interval', () => {
    render(
      <CacheProvider storage={mockStorage}>
        <TestChild />
      </CacheProvider>,
    )

    expect(useInterval).toHaveBeenCalledWith(cacheStoreModule.runCacheGarbageCollector, 5000)
  })

  it('should call useInterval with runCacheGarbageCollector and custom interval', () => {
    render(
      <CacheProvider storage={mockStorage} gcInterval={10000}>
        <TestChild />
      </CacheProvider>,
    )

    expect(useInterval).toHaveBeenCalledWith(cacheStoreModule.runCacheGarbageCollector, 10000)
  })

  it('should render children and provide context with storage', () => {
    render(
      <CacheProvider storage={mockStorage}>
        <TestChild />
      </CacheProvider>,
    )

    expect(screen.getByText('Storage')).toBeDefined()
  })
})
