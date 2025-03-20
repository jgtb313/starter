import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

import { useRequest } from './use-request'

const mockHandler = vi.fn()

describe('useRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return initial state correctly', () => {
    const { result } = renderHook(() => useRequest(mockHandler))

    const [fetch, { data, error, loading }] = result.current

    expect(fetch).toBeInstanceOf(Function)
    expect(data).toBeUndefined()
    expect(error).toBeUndefined()
    expect(loading).toBe(false)
  })

  it('should update loading state on fetch', async () => {
    mockHandler.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve('response data'), 400)))

    const { result, rerender } = renderHook(() => useRequest(mockHandler))

    await act(async () => {
      rerender()
      result.current[0]({ params: {} })
    })

    await waitFor(() => {
      expect(result.current[1].loading).toBe(true)
    })

    await waitFor(() => {
      expect(result.current[1].loading).toBe(false)
    })
  })

  it('should update data state on success', async () => {
    mockHandler.mockResolvedValueOnce('response data')

    const { result } = renderHook(() => useRequest(mockHandler))
    const [fetch] = result.current

    await act(async () => {
      await fetch({ params: {} })
    })

    expect(result.current[1].data).toBe('response data')
  })

  it('should update error state on failure', async () => {
    const error = new Error('Request failed')
    mockHandler.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useRequest(mockHandler))
    const [fetch] = result.current

    await act(async () => {
      await fetch({ params: {} }).catch(() => {})
    })

    expect(result.current[1].error).toBe(error)
  })

  it('should allow updating data manually', () => {
    const { result } = renderHook(() => useRequest(mockHandler))
    const { updateData } = result.current[1]

    act(() => {
      updateData('new data')
    })

    expect(result.current[1].data).toBe('new data')
  })

  it('should call onPreFetch before request', async () => {
    const onPreFetch = vi.fn()
    mockHandler.mockResolvedValueOnce('response data')

    const { result } = renderHook(() => useRequest(mockHandler))
    const [fetch] = result.current

    await act(async () => {
      await fetch({
        params: {},
        onPreFetch,
      })
    })

    expect(onPreFetch).toHaveBeenCalledTimes(1)
  })

  it('should call onSuccess with data and params on successful request', async () => {
    const onSuccess = vi.fn()
    const params = { id: '123' }
    mockHandler.mockResolvedValueOnce('response data')

    const { result } = renderHook(() => useRequest(mockHandler))
    const [fetch] = result.current

    await act(async () => {
      await fetch({
        params,
        onSuccess,
      })
    })

    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onSuccess).toHaveBeenCalledWith('response data', params)
  })

  it('should call onError with error on failed request', async () => {
    const onError = vi.fn()
    const error = new Error('Request failed')
    mockHandler.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useRequest(mockHandler))
    const [fetch] = result.current

    await act(async () => {
      await fetch({
        params: {},
        onError,
      }).catch(() => {})
    })

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith(error)
  })

  it('should call onFinally after request completes', async () => {
    const onFinally = vi.fn()
    mockHandler.mockResolvedValueOnce('response data')

    const { result } = renderHook(() => useRequest(mockHandler))
    const [fetch] = result.current

    await act(async () => {
      await fetch({
        params: {},
        onFinally,
      })
    })

    expect(onFinally).toHaveBeenCalledTimes(1)
  })

  it('should call onFinally after request fails', async () => {
    const onFinally = vi.fn()
    mockHandler.mockRejectedValueOnce(new Error('Request failed'))

    const { result } = renderHook(() => useRequest(mockHandler))
    const [fetch] = result.current

    await act(async () => {
      await fetch({
        params: {},
        onFinally,
      }).catch(() => {})
    })

    expect(onFinally).toHaveBeenCalledTimes(1)
  })
})
