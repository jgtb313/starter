import { describe, it, expect, vi } from 'vitest'

import { makeRequest } from './make-request'

describe('makeRequest', () => {
  const handler = vi.fn()

  it('should makeRequest call onSuccess when the request is successful', async () => {
    const onSuccess = vi.fn()
    handler.mockResolvedValueOnce('successData')

    await makeRequest(handler, {
      params: { test: true },
      onSuccess,
    })

    expect(onSuccess).toHaveBeenCalledWith('successData', { test: true })
  })

  it('should makeRequest call onPreFetch before making a request', async () => {
    const onPreFetch = vi.fn()
    handler.mockResolvedValueOnce('result')

    await makeRequest(handler, {
      params: { test: true },
      onPreFetch,
    })

    expect(onPreFetch).toHaveBeenCalled()
  })

  it('should makeRequest call onFinally after the request completes', async () => {
    const onFinally = vi.fn()
    handler.mockResolvedValueOnce('result')

    await makeRequest(handler, {
      params: { test: true },
      onFinally,
    })

    expect(onFinally).toHaveBeenCalled()
  })

  it('should makeRequest call onError when the request fails', async () => {
    const onError = vi.fn()
    const error = new Error('Test error')
    handler.mockRejectedValueOnce(error)

    await expect(makeRequest(handler, { params: { test: true }, onError })).rejects.toThrow(error)

    expect(onError).toHaveBeenCalledWith('Test error')
  })

  it('should makeRequest call onSuccess in options when the request is successful', async () => {
    const onSuccess = vi.fn()
    handler.mockResolvedValueOnce('successData')

    await makeRequest(handler, {
      params: { test: true },
      options: { onSuccess },
    })

    expect(onSuccess).toHaveBeenCalledWith('successData', { test: true })
  })

  it('should makeRequest call onPreFetch in options before making a request', async () => {
    const onPreFetch = vi.fn()
    handler.mockResolvedValueOnce('result')

    await makeRequest(handler, {
      params: { test: true },
      options: { onPreFetch },
    })

    expect(onPreFetch).toHaveBeenCalled()
  })

  it('should makeRequest call onFinally in options after the request completes', async () => {
    const onFinally = vi.fn()
    handler.mockResolvedValueOnce('result')

    await makeRequest(handler, {
      params: { test: true },
      options: { onFinally },
    })

    expect(onFinally).toHaveBeenCalled()
  })

  it('should makeRequest call onError in options when the request fails', async () => {
    const onError = vi.fn()
    const error = new Error('Test error')
    handler.mockRejectedValueOnce(error)

    await expect(makeRequest(handler, { params: { test: true }, options: { onError } })).rejects.toThrow(error)

    expect(onError).toHaveBeenCalledWith('Test error')
  })
})
