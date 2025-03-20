import { describe, it, expect, vi } from 'vitest'

import { sleep } from './sleep'

describe('sleep', () => {
  it('should resolve after the specified time in seconds', async () => {
    vi.useFakeTimers()
    const mockResolve = vi.fn()
    const delayInSeconds = 2
    const promise = sleep(delayInSeconds).then(mockResolve)

    vi.advanceTimersByTime(delayInSeconds * 1000)
    await promise

    expect(mockResolve).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('should wait for the exact time before resolving', async () => {
    const start = Date.now()
    const delayInSeconds = 1

    await sleep(delayInSeconds)

    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(delayInSeconds * 1000)
  })
})
