import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useMutation } from './use-mutation'

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

describe('useMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return initial state correctly', () => {
    const { result } = renderHook(() => useMutation(mockHandler, {}))
    const [mutate, { data, error, loading }] = result.current

    expect(mutate).toBeInstanceOf(Function)
    expect(data).toBeUndefined()
    expect(error).toBeUndefined()
    expect(loading).toBe(false)
  })

  it('should update data on successful mutation', async () => {
    mockHandler.mockResolvedValueOnce('mutated data')

    const { result } = renderHook(() => useMutation(mockHandler, {}))
    const [mutate] = result.current

    await act(async () => {
      await mutate({ params: { id: '123' } })
    })

    expect(result.current[1].data).toBe('mutated data')
    expect(mockCache.remove).not.toHaveBeenCalled()
  })

  it('should invalidate simple cache key on success', async () => {
    mockHandler.mockResolvedValueOnce('mutated data')

    const { result } = renderHook(() =>
      useMutation(mockHandler, {
        invalidateQueries: { user: true },
      }),
    )
    const [mutate] = result.current

    await act(async () => {
      await mutate({ params: { id: '123' } })
    })

    expect(mockCache.remove).toHaveBeenCalledTimes(1)
    expect(result.current[1].data).toBe('mutated data')
  })

  it('should invalidate parameterized cache key on success', async () => {
    mockHandler.mockResolvedValueOnce('mutated data')

    const { result } = renderHook(() =>
      useMutation(mockHandler, {
        invalidateQueries: { userDetails: { id: '123' } },
      }),
    )
    const [mutate] = result.current

    await act(async () => {
      await mutate({ params: { id: '123' } })
    })

    expect(mockCache.remove).toHaveBeenCalledTimes(1)
    expect(result.current[1].data).toBe('mutated data')
  })

  it('should call input onSuccess after invalidation', async () => {
    mockHandler.mockResolvedValueOnce('mutated data')
    const onSuccess = vi.fn()

    const { result } = renderHook(() =>
      useMutation(mockHandler, {
        invalidateQueries: { user: true },
      }),
    )
    const [mutate] = result.current

    await act(async () => {
      await mutate({ params: { id: '123' }, onSuccess })
    })

    expect(mockCache.remove).toHaveBeenCalledTimes(1)
    expect(onSuccess).toHaveBeenCalledWith('mutated data', { id: '123' })
    expect(result.current[1].data).toBe('mutated data')
  })

  it('should update error state on failure', async () => {
    const error = new Error('Mutation failed')
    mockHandler.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useMutation(mockHandler, {}))
    const [mutate] = result.current

    await act(async () => {
      await mutate({ params: { id: '123' } }).catch(() => {})
    })

    expect(result.current[1].error).toBe(error)
    expect(mockCache.remove).not.toHaveBeenCalled()
  })

  it('should use defaultValues if provided', () => {
    const { result } = renderHook(() =>
      useMutation(mockHandler, {
        defaultValues: 'initial data',
      }),
    )

    expect(result.current[1].data).toBe('initial data')
  })
})
