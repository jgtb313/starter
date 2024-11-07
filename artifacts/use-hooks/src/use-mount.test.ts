import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'

import { useMount } from './use-mount'

describe('useMount', () => {
  it('should useMount call the callback once when the component mounts', () => {
    const callback = vi.fn()

    renderHook(() => useMount(callback))

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should useMount not call the callback again on re-renders', () => {
    const callback = vi.fn()

    const { rerender } = renderHook(() => useMount(callback))

    rerender()
    rerender()

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
