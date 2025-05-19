import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { UseRequestProvider } from './use-request.provider'
import * as cacheProviderModule from './use-cache.provider'

vi.mock('./use-cache.provider', () => {
  return {
    CacheProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="cache-provider">{children}</div>,
  }
})

describe('UseRequestProvider', () => {
  const mockStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  } as Storage

  it('should render children inside CacheProvider', () => {
    render(
      <UseRequestProvider cacheProvider={{ storage: mockStorage }}>
        <div>Test Child</div>
      </UseRequestProvider>,
    )

    expect(screen.getByText('Test Child')).toBeDefined()
    expect(screen.getByTestId('cache-provider')).toBeDefined()
  })

  it('should pass cacheProvider props correctly to CacheProvider', () => {
    const CacheProviderSpy = vi.spyOn(cacheProviderModule, 'CacheProvider')

    render(
      <UseRequestProvider cacheProvider={{ storage: mockStorage, gcInterval: 12345 }}>
        <div>Child</div>
      </UseRequestProvider>,
    )

    expect(CacheProviderSpy).toHaveBeenCalled()
    const callArgs = CacheProviderSpy.mock.calls[0][0]

    expect(callArgs.storage).toBe(mockStorage)
    expect(callArgs.gcInterval).toBe(12345)
    expect(callArgs.children).toBeDefined()

    CacheProviderSpy.mockRestore()
  })
})
