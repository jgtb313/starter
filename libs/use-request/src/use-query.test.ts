import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

import { useQuery } from './use-query'

const mockHandler = vi.fn()

const mockCache = {
  get: vi.fn(),
  set: vi.fn(),
  remove: vi.fn(),
}

vi.mock('./use-cache', () => ({
  useCache: vi.fn(() => mockCache),
  createCacheKey: vi.fn(() => 'fixed-cache-key'),
}))

describe('useQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCache.get.mockReturnValue(undefined)
  })

  it('should return initial state correctly', () => {
    const { result } = renderHook(() => useQuery(mockHandler, { queryKey: 'test' }))
    const [fetch, { data, error, loading }] = result.current

    expect(fetch).toBeInstanceOf(Function)
    expect(data).toBeUndefined()
    expect(error).toBeUndefined()
    expect(loading).toBe(false)
  })

  it('should use cached data as default value if available', () => {
    mockCache.get.mockReturnValueOnce('cached data')

    const { result } = renderHook(() => useQuery(mockHandler, { queryKey: 'test' }))

    expect(result.current[1].data).toBe('cached data')
  })

  it('should return cached value and update state when fetch is called if cache exists', async () => {
    mockCache.get.mockReturnValue('cached data')

    const testParams = { id: '123' }
    const { result } = renderHook(() => useQuery(mockHandler, { queryKey: 'test', params: testParams }))
    const [fetch] = result.current

    expect(result.current[1].data).toBe('cached data')

    let resultData
    await act(async () => {
      resultData = await fetch({ params: testParams })
    })

    expect(resultData).toBe('cached data')
    expect(result.current[1].data).toBe('cached data')
    expect(mockHandler).not.toHaveBeenCalled()
    expect(mockCache.set).not.toHaveBeenCalled()

    await act(async () => {
      const secondResult = await fetch({ params: testParams })
      expect(secondResult).toBe('cached data')
    })
    expect(result.current[1].data).toBe('cached data')
  })

  it.each([{ id: '123' }, undefined])('should fetch and cache new data if not cached', async (params) => {
    mockHandler.mockResolvedValueOnce('fetched data')
    const { result } = renderHook(() =>
      useQuery(mockHandler, {
        queryKey: 'test',
        ttl: 60000,
      }),
    )
    const [fetch] = result.current

    let resultData
    await act(async () => {
      resultData = await fetch({ params })
    })

    expect(result.current[1].data).toBe('fetched data')
    expect(resultData).toBe('fetched data')
    expect(mockCache.set).toHaveBeenCalled()
  })

  it('should update loading state on fetch', async () => {
    mockHandler.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve('response data'), 100)))

    const { result } = renderHook(() => useQuery(mockHandler, { queryKey: 'test' }))
    const [fetch] = result.current

    await act(async () => {
      fetch({ params: {} })
    })

    await waitFor(
      () => {
        expect(result.current[1].loading).toBe(true)
      },
      { timeout: 50 },
    )

    await waitFor(() => {
      expect(result.current[1].loading).toBe(false)
    })
  })

  it('should update error state on failure', async () => {
    const error = new Error('Request failed')
    mockHandler.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useQuery(mockHandler, { queryKey: 'test' }))
    const [fetch] = result.current

    await act(async () => {
      await fetch({ params: { id: '123' } }).catch(() => {})
    })

    expect(result.current[1].error).toBe(error)
    expect(mockCache.set).not.toHaveBeenCalled()
  })

  it('should use defaultValues if provided and no cache exists', () => {
    const { result } = renderHook(() =>
      useQuery(mockHandler, {
        queryKey: 'test',
        defaultValues: 'default data',
      }),
    )

    expect(result.current[1].data).toBe('default data')
  })

  it('should trigger events when fetching new data', async () => {
    const onSuccess = vi.fn()
    const onPreFetch = vi.fn()
    mockHandler.mockResolvedValueOnce('fetched data')

    const { result } = renderHook(() =>
      useQuery(mockHandler, {
        queryKey: 'test',
        events: { onSuccess, onPreFetch },
      }),
    )
    const [fetch] = result.current

    await act(async () => {
      await fetch({ params: { id: '123' } })
    })

    expect(onPreFetch).toHaveBeenCalled()
    expect(onSuccess).toHaveBeenCalledWith('fetched data', { id: '123' })
    expect(result.current[1].data).toBe('fetched data')
  })
})
