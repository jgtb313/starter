import { describe, it, expect, vi, MockedFunction } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { useIsMobile } from './useIsMobile'
import { useMediaQuery } from '@mantine/hooks'

vi.mock('@mantine/hooks', () => ({
  useMediaQuery: vi.fn()
}))

describe('useIsMobile', () => {
  it('should return true when width is less than or equal to 600px', () => {
    ;(useMediaQuery as MockedFunction<typeof useMediaQuery>).mockReturnValue(true)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('should return false when width is greater than 600px', () => {
    ;(useMediaQuery as MockedFunction<typeof useMediaQuery>).mockReturnValue(false)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })
})
