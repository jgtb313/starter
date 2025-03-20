import { PropsWithChildren } from 'react'
import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'

import { CacheContext, useCacheContext, CacheContextProps } from './use-cache.context'

describe('useCacheContext', () => {
  it('should return the context when inside a CacheProvider', () => {
    const mockStorage = {} as Storage
    const mockContext: CacheContextProps = { storage: mockStorage }

    const wrapper = ({ children }: PropsWithChildren) => <CacheContext.Provider value={mockContext}>{children}</CacheContext.Provider>

    const { result } = renderHook(() => useCacheContext(), { wrapper })

    expect(result.current).toBe(mockContext)
  })

  it('should throw an error when used outside a CacheProvider', () => {
    expect(() => renderHook(() => useCacheContext())).toThrowError('useCacheContext must be used within a CacheProvider')
  })
})
