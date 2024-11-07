import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'

import { useUnmount } from './use-unmount'

describe('useUnmount', () => {
  it('should useUnmount call the callback when the component unmounts', () => {
    const callback = vi.fn()

    const { unmount } = renderHook(() => useUnmount(callback))

    unmount()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should useUnmount not call the callback on rerender', () => {
    const callback = vi.fn()

    const { rerender } = renderHook(() => useUnmount(callback))

    rerender()

    expect(callback).toHaveBeenCalledTimes(0)
  })
})
