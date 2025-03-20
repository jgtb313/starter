import { PropsWithChildren } from 'react'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useCache, createCacheKey } from './use-cache'
import { CacheProvider } from './use-cache.provider'

describe('useCache', () => {
  let mockStorage: Storage

  const wrapper = ({ children }: PropsWithChildren) => <CacheProvider storage={mockStorage}>{children}</CacheProvider>

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()

    mockStorage = {
      length: 0,
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
    }
  })

  it('should set and get data in cache', () => {
    const { result } = renderHook(() => useCache(), { wrapper })

    const key = 'testKey'
    const value = { test: 'value' }
    const ttl = 1000

    act(() => {
      result.current.set(key, value, ttl)
    })

    expect(mockStorage.setItem).toHaveBeenCalledTimes(1)

    expect(mockStorage.setItem).toHaveBeenCalledWith('cacheData', expect.any(String))

    const data = result.current.get(key)

    expect(data).toEqual(value)
  })

  // it('should return undefined if ttl is expired', async () => {
  //   const { result } = renderHook(() => useCache(), { wrapper })

  //   const key = 'testKey'
  //   const value = { test: 'value' }
  //   const ttl = 1

  //   act(() => {
  //     result.current.set(key, value, ttl)
  //   })

  //   act(() => {
  //     vi.advanceTimersByTime(2000)
  //   })

  //   const data = result.current.get(key)

  //   expect(data).toBeUndefined()
  // })

  it('should not set data when ttl is undefined', () => {
    const { result } = renderHook(() => useCache(), { wrapper })

    const key = 'testKey'
    const value = { test: 'value' }

    act(() => {
      result.current.set(key, value)
    })

    expect(mockStorage.setItem).not.toHaveBeenCalled()
  })

  // it('should set ttlExpiration to Number.MAX_SAFE_INTEGER when ttl is Infinity', () => {
  //   const { result } = renderHook(() => useCache(), { wrapper })

  //   const key = 'testKey'
  //   const value = { test: 'value' }
  //   const ttl = Infinity

  //   act(() => {
  //     result.current.set(key, value, ttl)
  //   })

  //   expect(mockStorage.setItem).toHaveBeenCalled()
  // })
})

describe('createCacheKey', () => {
  it('should return only the key if the value object is empty', () => {
    expect(createCacheKey('key', {})).toBe('key')
  })

  it('should return key with sorted key-value pairs', () => {
    expect(createCacheKey('key', { b: '2', a: '1' })).toBe('key:a=1,b=2')
  })

  it('should return the same output for the same input order', () => {
    expect(createCacheKey('key', { a: '1', b: '2' })).toBe('key:a=1,b=2')
  })

  it('should handle numeric values correctly', () => {
    expect(createCacheKey('key', { b: 2, a: 1 })).toBe('key:a=1,b=2')
  })

  it('should handle mixed data types in values', () => {
    expect(createCacheKey('key', { c: true, b: 'text', a: 42 })).toBe('key:a=42,b=text,c=true')
  })

  it('should include ttl in the cache key if provided', () => {
    expect(createCacheKey('key', { a: '1', b: '2' }, 3600)).toBe('key:a=1,b=2,ttl=3600')
  })
})
