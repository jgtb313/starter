import { describe, it, expect, vi } from 'vitest'

import { makeRequest } from './make-request'

describe('makeRequest', () => {
  it('should call onPreFetch before executing the request', async () => {
    const mockHandler = vi.fn().mockResolvedValue('success')
    const onPreFetch = vi.fn()

    await makeRequest(mockHandler, { events: { onPreFetch }, onPreFetch })

    expect(onPreFetch).toHaveBeenCalled()
    expect(mockHandler).toHaveBeenCalled()
  })

  it('should call onSuccess with the correct data', async () => {
    const mockHandler = vi.fn().mockResolvedValue('success')
    const onSuccess = vi.fn()

    const params = { key: 'value' }

    await makeRequest(mockHandler, { params, events: { onSuccess }, onSuccess })

    expect(onSuccess).toHaveBeenCalledWith('success', params)
  })

  it('should call onError when an error occurs', async () => {
    const error = new Error('Request failed')

    const mockHandler = vi.fn().mockRejectedValue(error)
    const onError = vi.fn()

    await expect(makeRequest(mockHandler, { events: { onError }, onError })).rejects.toThrow('Request failed')
    expect(onError).toHaveBeenCalledWith(error)
  })

  it('should call onFinally after the request completes', async () => {
    const mockHandler = vi.fn().mockResolvedValue('success')
    const onFinally = vi.fn()

    await makeRequest(mockHandler, { events: { onFinally }, onFinally })

    expect(onFinally).toHaveBeenCalled()
  })

  it('should return the correct value from the handler', async () => {
    const mockHandler = vi.fn().mockResolvedValue('success')

    const result = await makeRequest(mockHandler, {})

    expect(result).toBe('success')
  })
})
