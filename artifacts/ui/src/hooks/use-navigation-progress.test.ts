import { vi, describe, it, expect, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { nprogress } from '@mantine/nprogress'

import { useNavigationProgress, UseNavigationProgressOptions } from './use-navigation-progress'

vi.mock('@mantine/nprogress', () => ({
  nprogress: {
    start: vi.fn(),
    complete: vi.fn(),
  },
}))

describe.only('useNavigationProgress', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('starts loading progress when state is submitting', () => {
    renderHook(() => useNavigationProgress({ state: 'submitting' }))

    expect(nprogress.start).toHaveBeenCalledTimes(1)
    expect(nprogress.complete).toHaveBeenCalledTimes(0)
  })

  it('starts loading progress when state is loading', () => {
    renderHook(() => useNavigationProgress({ state: 'loading' }))

    expect(nprogress.start).toHaveBeenCalledTimes(1)
    expect(nprogress.complete).toHaveBeenCalledTimes(0)
  })

  it('completes loading progress when state is idle', () => {
    renderHook(() => useNavigationProgress({ state: 'idle' }))

    expect(nprogress.start).toHaveBeenCalledTimes(0)
    expect(nprogress.complete).toHaveBeenCalledTimes(1)
  })

  it('updates correctly when state changes', () => {
    const { rerender } = renderHook(({ state }) => useNavigationProgress({ state }), {
      initialProps: { state: 'idle' } as UseNavigationProgressOptions,
    })

    expect(nprogress.start).toHaveBeenCalledTimes(0)
    expect(nprogress.complete).toHaveBeenCalledTimes(1)

    rerender({ state: 'submitting' })
    expect(nprogress.start).toHaveBeenCalledTimes(1)
    expect(nprogress.complete).toHaveBeenCalledTimes(1)

    rerender({ state: 'loading' })
    expect(nprogress.start).toHaveBeenCalledTimes(2)
    expect(nprogress.complete).toHaveBeenCalledTimes(1)

    rerender({ state: 'idle' })
    expect(nprogress.start).toHaveBeenCalledTimes(2)
    expect(nprogress.complete).toHaveBeenCalledTimes(2)
  })
})
