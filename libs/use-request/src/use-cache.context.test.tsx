import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import { CacheContext, useCacheContext } from './use-cache.context'

describe('useCacheContext', () => {
  const mockStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  } as Storage

  it('should return context value when used inside CacheProvider', () => {
    const wrapper = ({ children }: React.PropsWithChildren) => (
      <CacheContext.Provider value={{ storage: mockStorage }}>{children}</CacheContext.Provider>
    )

    const { result } = renderHook(() => useCacheContext(), { wrapper })

    expect(result.current.storage).toBe(mockStorage)
  })

  it('should throw error if used outside CacheProvider', () => {
    expect(() => renderHook(() => useCacheContext())).toThrowError('useCacheContext must be used within a CacheProvider')
  })
})
