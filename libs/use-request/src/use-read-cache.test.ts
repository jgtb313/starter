import { describe, expect, it, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

import { createCacheKey } from './use-cache'
import { useReadCache } from './use-read-cache'

const mockCache = {
  get: vi.fn(),
  set: vi.fn(),
  remove: vi.fn(),
}

vi.mock('./use-cache', () => ({
  useCache: vi.fn(() => mockCache),
  createCacheKey: vi.fn(() => 'fixed-cache-key'),
}))

describe('useReadCache', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return cached value', () => {
    const cacheKey = createCacheKey('key')

    mockCache.get.mockReturnValueOnce(10)

    const { result } = renderHook(() => useReadCache(cacheKey))

    expect(result.current).toBe(10)
  })

  it('should return undefined for missing key', () => {
    const { result } = renderHook(() => useReadCache('missingKey'))

    expect(result.current).toBeUndefined()
  })
})
