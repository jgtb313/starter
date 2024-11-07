import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react-hooks'

import { useLocalStorage } from './use-local-storage'

describe('useLocalStorage', () => {
  class LocalStorageMock implements Storage {
    private store: Record<string, string> = {}

    length = 0

    clear(): void {
      this.store = {}
      this.updateLength()
    }

    getItem(key: string): string | null {
      return this.store[key] || null
    }

    key(index: number): string | null {
      const keys = Object.keys(this.store)
      return keys[index] || null
    }

    removeItem(key: string): void {
      delete this.store[key]
      this.updateLength()
    }

    setItem(key: string, value: string): void {
      this.store[key] = value.toString()
      this.updateLength()
    }

    private updateLength(): void {
      this.length = Object.keys(this.store).length
    }
  }

  const localStorageMock = new LocalStorageMock()

  beforeEach(() => {
    vi.spyOn(global, 'localStorage', 'get').mockReturnValue(localStorageMock)
    localStorageMock.clear()
  })

  it('should useLocalStorage use defaultValue initially and store it in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'value'))

    expect(result.current[0]).toBe('value')
    expect(localStorageMock.getItem('key')).toBe(JSON.stringify('value'))
  })

  it('should useLocalStorage update the localStorage when a new value is set', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'value'))

    act(() => {
      result.current[1]('newVal')
    })

    expect(result.current[0]).toBe('newVal')
    expect(localStorageMock.getItem('key')).toBe(JSON.stringify('newVal'))
  })

  it('should useLocalStorage retrieve stored value from localStorage', () => {
    localStorageMock.setItem('key', JSON.stringify('value'))

    const { result } = renderHook(() => useLocalStorage('key'))

    expect(result.current[0]).toBe('value')
  })
})
