import { describe, it, expect, vi, afterEach } from 'vitest'
import { utcToZonedTime } from 'date-fns-tz'

import { getDate } from './getDate'

vi.mock('date-fns-tz', () => ({
  utcToZonedTime: vi.fn((date) => new Date(date))
}))

describe('getDate', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('converts UTC date to America/Sao_Paulo timezone', () => {
    const utcDate = new Date('2023-05-15T10:30:00Z')

    getDate(utcDate)

    expect(utcToZonedTime).toHaveBeenCalledWith(utcDate, 'America/Sao_Paulo')
  })

  it('handles date string input', () => {
    const dateString = '2023-05-15T10:30:00Z'

    getDate(dateString)

    expect(utcToZonedTime).toHaveBeenCalledWith(dateString, 'America/Sao_Paulo')
  })

  it('handles ISO date string', () => {
    const isoString = '2023-05-15'

    getDate(isoString)

    expect(utcToZonedTime).toHaveBeenCalledWith(isoString, 'America/Sao_Paulo')
  })

  it('returns a Date object', () => {
    const result = getDate('2023-05-15T10:30:00Z')

    expect(result).toBeInstanceOf(Date)
  })

  it('maintains the correct time after conversion', () => {
    const originalDate = new Date('2023-05-15T10:30:00Z')
    const result = getDate(originalDate)

    expect(result.getUTCHours()).toBe(10)
    expect(result.getUTCMinutes()).toBe(30)
  })

  it.each(['2023-05-15', '2023-05-15T10:30:00', '2023-05-15T10:30:00Z', '2023-05-15T10:30:00+00:00'])('handles date format $s', (format) => {
    getDate(format)
    expect(utcToZonedTime).toHaveBeenCalledWith(format, 'America/Sao_Paulo')
  })
})
