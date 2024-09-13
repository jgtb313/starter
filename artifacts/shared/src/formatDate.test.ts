import { describe, it, expect } from 'vitest'

import { formatDate } from './formatDate'

describe('formatDate', () => {
  const testDate = new Date('2023-05-15T10:30:00Z')
  const testDateString = '2023-05-15T10:30:00Z'

  it('formats Date object with default format', () => {
    expect(formatDate(testDate)).toBe('15/05/2023')
  })

  it('formats date string with default format', () => {
    expect(formatDate(testDateString)).toBe('15/05/2023')
  })

  it('uses custom format', () => {
    expect(formatDate(testDate, 'yyyy-MM-dd')).toBe('2023-05-15')
  })

  it('uses Brazilian Portuguese locale', () => {
    expect(formatDate(testDate, 'PPPP')).toBe('segunda-feira, 15 de maio de 2023')
  })

  it('uses America/Sao_Paulo timezone', () => {
    expect(formatDate(testDate, 'HH:mm')).toBe('07:30') // São Paulo is UTC-3
  })

  it('combines custom format with locale and timezone', () => {
    expect(formatDate(testDate, "d 'de' MMMM 'às' HH:mm")).toBe('15 de maio às 07:30')
  })

  it('handles date-only strings', () => {
    expect(formatDate('2023-05-15')).toBe('15/05/2023')
  })

  it('formats time correctly', () => {
    expect(formatDate(testDate, 'HH:mm:ss')).toBe('07:30:00')
  })

  it('includes timezone in output when specified in format', () => {
    expect(formatDate(testDate, 'yyyy-MM-dd HH:mm:ssXXX')).toBe('2023-05-15 07:30:00-03:00')
  })

  it('uses 24-hour format', () => {
    const eveningDate = new Date('2023-05-15T22:30:00Z')
    expect(formatDate(eveningDate, 'HH:mm')).toBe('19:30')
  })

  it('calls getDate function for input processing', () => {
    formatDate(testDate)

    formatDate(testDateString)
  })
})
