import { describe, it, expect, vi, afterEach } from 'vitest'
import { toZonedTime } from 'date-fns-tz'

import { getDate } from './get-date'

vi.mock('date-fns-tz', () => ({
  toZonedTime: vi.fn((date) => new Date(date)),
}))

describe('getDate', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('converts UTC date to America/Sao_Paulo timezone', () => {
    const utcDate = new Date('2023-05-15T10:30:00Z')

    getDate(utcDate)

    expect(toZonedTime).toHaveBeenCalledWith(utcDate, 'America/Sao_Paulo')
  })

  it('handles date string input', () => {
    const dateString = '2023-05-15T10:30:00Z'

    getDate(dateString)

    expect(toZonedTime).toHaveBeenCalledWith(dateString, 'America/Sao_Paulo')
  })

  it('handles ISO date string', () => {
    const isoString = '2023-05-15'

    getDate(isoString)

    expect(toZonedTime).toHaveBeenCalledWith(isoString, 'America/Sao_Paulo')
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
    expect(toZonedTime).toHaveBeenCalledWith(format, 'America/Sao_Paulo')
  })
})
