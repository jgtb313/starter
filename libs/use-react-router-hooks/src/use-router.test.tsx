import { describe, it, expect, vi, Mock } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { MemoryRouter, useNavigate, useLocation, useParams } from 'react-router'
import { z } from '@starter/schema'

import { useRouter } from './use-router'

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
    useParams: vi.fn(),
  }
})

const useNavigateMock = useNavigate as Mock<typeof useNavigate>
const useLocationMock = useLocation as Mock<typeof useLocation>
const useParamsMock = useParams as Mock<typeof useParams>

describe('useRouter', () => {
  it('should return basic router functionality ', () => {
    useLocationMock.mockReturnValue({ key: '', state: '', pathname: '/users', search: '', hash: '' })

    const { result } = renderHook(() => useRouter(), { wrapper: MemoryRouter })

    expect(result.current.path).toBe('/users')
  })

  it('should correctly parse query parameters using schema', () => {
    const querySchema = z.object({ foo: z.string(), bar: z.coerce.number() })

    useLocationMock.mockReturnValue({ key: '', state: '', pathname: '/users', search: '?foo=bar&bar=123', hash: '' })

    const { result } = renderHook(() => useRouter({ query: querySchema }), { wrapper: MemoryRouter })

    expect(result.current.query).toEqual({ foo: 'bar', bar: 123 })
  })

  it('should correctly parse route parameters using schema', () => {
    const paramsSchema = z.object({ id: z.string() })

    useParamsMock.mockReturnValue({ id: 'a09574c7-bcd7-4670-a6b2-e09b3c29105f' })

    const { result } = renderHook(() => useRouter({ params: paramsSchema }), { wrapper: MemoryRouter })

    expect(result.current.params).toEqual({ id: 'a09574c7-bcd7-4670-a6b2-e09b3c29105f' })
  })

  it('should navigate using push', () => {
    const navigateMock = vi.fn()

    useNavigateMock.mockReturnValue(navigateMock)

    const { result } = renderHook(() => useRouter(), { wrapper: (props) => <MemoryRouter initialEntries={['/users']} initialIndex={0} {...props} /> })

    result.current.push('/new-path')

    expect(navigateMock).toHaveBeenCalledWith('/new-path')
  })

  it('should navigate using replace', async () => {
    const navigateMock = vi.fn()

    useNavigateMock.mockReturnValue(navigateMock)

    const { result } = renderHook(() => useRouter(), {
      wrapper: (props) => <MemoryRouter initialEntries={['/users']} initialIndex={0} {...props} />,
    })

    act(() => {
      result.current.replace('/new-path')
    })

    expect(navigateMock).toHaveBeenCalledWith('/new-path', { replace: true })
  })

  it('should update query parameters', () => {
    global.window = Object.create(window)

    const href = 'http://localhost/users'

    Object.defineProperty(window, 'location', {
      value: {
        href,
        pathname: '/users',
        search: '',
      },
      writable: true,
    })

    const replaceStateMock = vi.spyOn(window.history, 'replaceState').mockImplementation((_, __, url) => {
      const newUrl = new URL(`${url}`, window.location.origin)

      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          href: newUrl.href,
          search: newUrl.search,
        },
        writable: true,
      })
    })

    const querySchema = z.object({ foo: z.string().optional(), bar: z.string().optional() })

    const { result } = renderHook(() => useRouter({ query: querySchema }), { wrapper: MemoryRouter })

    act(() => {
      result.current.update({ foo: 'newValue', bar: '123' })
    })

    expect(replaceStateMock).toHaveBeenCalledWith({}, '', new URL(`${href}?foo=newValue&bar=123`))
    expect(window.location.search).toBe('?foo=newValue&bar=123')

    replaceStateMock.mockRestore()
  })

  it('should clear the query string and update the history when no query parameters are provided', () => {
    global.window = Object.create(window)

    const href = 'http://localhost/users'

    Object.defineProperty(window, 'location', {
      value: {
        href,
        pathname: '/users',
        search: '?foo=bar&bar=123',
      },
      writable: true,
    })

    const replaceStateMock = vi.spyOn(window.history, 'replaceState').mockImplementation((_, __, url) => {
      const newUrl = new URL(`${url}`, window.location.origin)

      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          href: newUrl.href,
          search: newUrl.search,
        },
        writable: true,
      })
    })

    const querySchema = z.object({ foo: z.string().optional(), bar: z.string().optional() })

    const { result } = renderHook(() => useRouter({ query: querySchema }), { wrapper: MemoryRouter })

    act(() => {
      result.current.update({})
    })

    expect(replaceStateMock).toHaveBeenCalledWith({}, '', new URL(href))
    expect(window.location.search).toBe('')

    replaceStateMock.mockRestore()
  })

  it('should remove query parameters when updating with empty values', () => {
    global.window = Object.create(window)

    const href = 'http://localhost/users'
    const search = '?foo=newValue&bar=123'

    Object.defineProperty(window, 'location', {
      value: {
        href,
        pathname: '/users',
        search: search,
      },
      writable: true,
    })

    const replaceStateMock = vi.spyOn(window.history, 'replaceState').mockImplementation((_, __, url) => {
      const newUrl = new URL(`${url}`, window.location.origin)

      Object.defineProperty(window, 'location', {
        value: {
          ...window.location,
          href: newUrl.href,
          search: newUrl.search,
        },
        writable: true,
      })
    })

    const querySchema = z.object({ foo: z.string().optional(), bar: z.string().optional() })

    const { result } = renderHook(() => useRouter({ query: querySchema }), { wrapper: MemoryRouter })

    act(() => {
      result.current.update({ foo: '', bar: undefined })
    })

    expect(replaceStateMock).toHaveBeenCalledWith({}, '', new URL(href))
    expect(window.location.search).toBe('')

    replaceStateMock.mockRestore()
  })

  it('should navigate back', () => {
    const navigateMock = vi.fn()

    useNavigateMock.mockReturnValue(navigateMock)

    const { result } = renderHook(() => useRouter(), {
      wrapper: (props) => <MemoryRouter initialEntries={['/users']} initialIndex={0} {...props} />,
    })

    act(() => {
      result.current.back()
    })

    expect(navigateMock).toHaveBeenCalledWith(-1)
  })
})
