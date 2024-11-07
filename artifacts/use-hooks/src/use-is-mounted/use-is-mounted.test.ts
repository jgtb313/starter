import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react-hooks'

import { useIsMounted } from './use-is-mounted'

describe('useIsMounted', () => {
  it('should useIsMounted initially be false before the component is mounted', () => {
    renderHook(() => {
      const isMounted = useIsMounted()

      expect(isMounted).toBe(false)
    })
  })

  it('should useIsMounted return true after component is mounted', () => {
    const { result } = renderHook(() => useIsMounted())

    expect(result.current).toBe(true)
  })

  it('should useIsMounted not change after initial mount', () => {
    const { result, rerender } = renderHook(() => useIsMounted())

    act(() => {
      rerender()
    })

    expect(result.current).toBe(true)
  })
})
