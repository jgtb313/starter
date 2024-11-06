import { describe, it, expect, vi } from 'vitest'
import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useRequest } from './useRequest'

describe('useRequest', () => {
  const handler = vi.fn()

  it('should useRequest update loading state during fetch', async () => {
    handler.mockResolvedValueOnce('response data')

    const { result } = renderHook(() => useRequest(handler))

    const [fetch] = result.current

    act(() => {
      fetch({ params: { test: true } })
    })

    expect(result.current[1].loading).toBe(true)

    await act(async () => {
      await handler
    })

    expect(result.current[1].loading).toBe(false)
  })

  it('should useRequest call onSuccess callback on successful fetch', async () => {
    const onSuccess = vi.fn()
    handler.mockResolvedValueOnce('success data')

    const { result } = renderHook(() => useRequest(handler))

    const [fetch] = result.current

    await act(async () => {
      await fetch({ params: { test: true }, onSuccess })
    })

    expect(onSuccess).toHaveBeenCalledWith('success data', { test: true })
  })

  it('should useRequest call onError callback on failed fetch', async () => {
    const onError = vi.fn()
    const error = new Error('Test error')
    handler.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useRequest(handler))

    const [fetch] = result.current

    await act(async () => {
      await expect(fetch({ params: { test: true }, onError })).rejects.toThrow('Test error')
    })

    expect(onError).toHaveBeenCalledWith('Test error')
  })

  it('should useRequest call onFinally callback after fetch', async () => {
    const onFinally = vi.fn()
    handler.mockResolvedValueOnce('response data')

    const { result } = renderHook(() => useRequest(handler))

    const [fetch] = result.current

    await act(async () => {
      await fetch({ params: { test: true }, onFinally })
    })

    expect(onFinally).toHaveBeenCalled()
  })

  it('should useRequest call onPreFetch callback after fetch', async () => {
    const onPreFetch = vi.fn()
    handler.mockResolvedValueOnce('response data')

    const { result } = renderHook(() => useRequest(handler))

    const [fetch] = result.current

    await act(async () => {
      await fetch({ params: { test: true }, onPreFetch })
    })

    expect(onPreFetch).toHaveBeenCalled()
  })

  it('should useRequest update data using updateData function', () => {
    const { result } = renderHook(() => useRequest(handler))

    const [, { updateData }] = result.current

    act(() => {
      updateData('new data')
    })

    expect(result.current[1].data).toBe('new data')
  })

  it('should useRequest initialize with initialValues', () => {
    const initialValues = { data: 'initial' }

    const { result } = renderHook(() => useRequest(handler, { initialValues }))

    const [, { data }] = result.current

    expect(data).toEqual(initialValues)
  })

  it('should useRequest update data when initialValues changes', () => {
    const initialValues = { data: 'initial' }
    const newInitialValues = { data: 'updated' }

    const { result, rerender } = renderHook(({ initialValues }) => useRequest(handler, { initialValues }), {
      initialProps: { initialValues },
    })

    expect(result.current[1].data).toBe(initialValues)

    rerender({ initialValues: newInitialValues })

    expect(result.current[1].data).toBe(newInitialValues)
  })
})
