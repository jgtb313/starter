import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react-hooks'

import { useWatch } from './use-watch'

describe('useWatch', () => {
  it('should useWatch call the callback when dependencies change', () => {
    const callback = vi.fn()
    let deps = [1]

    const { rerender } = renderHook(() => useWatch(callback, deps))

    deps = [2]
    act(() => {
      rerender()
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should useWatch not call the callback on initial render', () => {
    const callback = vi.fn()

    renderHook(() => useWatch(callback, []))

    expect(callback).not.toHaveBeenCalled()
  })

  it('should useWatch not call the callback if dependencies do not change', () => {
    const callback = vi.fn()
    const deps = [1]

    const { rerender } = renderHook(() => useWatch(callback, deps))

    act(() => {
      rerender()
    })

    expect(callback).toHaveBeenCalledTimes(0)
  })
})
