import { describe, it, expect } from 'vitest'

import { formatDateRange } from './formatDateRange'

describe('formatDateRange', () => {
  const date1 = new Date(2023, 0, 1) // January 1, 2023
  const date2 = new Date(2023, 11, 31) // December 31, 2023

  it('formats date range with default options', () => {
    const result = formatDateRange(date1, date2)

    expect(result).toBe('01/01/2023 • 31/12/2023')
  })

  it('formats date range with custom format string', () => {
    const result = formatDateRange(date1, date2, 'yyyy-MM-dd')

    expect(result).toBe('2023-01-01 • 2023-12-31')
  })

  it('formats date range with custom options object', () => {
    const result = formatDateRange(date1, date2, { format: 'dd.MM.yyyy', separator: 'to' })

    expect(result).toBe('01.01.2023 to 31.12.2023')
  })

  it('handles string dates', () => {
    const result = formatDateRange('2023-01-01', '2023-12-31', 'MMMM d, yyyy')

    expect(result).toBe('janeiro 1, 2023 • dezembro 31, 2023')
  })

  it('uses default separator when only format is provided in options object', () => {
    const result = formatDateRange(date1, date2, { format: 'yyyy/MM/dd' })

    expect(result).toBe('2023/01/01 • 2023/12/31')
  })

  it('uses default format when only separator is provided in options object', () => {
    const result = formatDateRange(date1, date2, { separator: '-' })

    expect(result).toBe('01/01/2023 - 31/12/2023')
  })

  it('handles dates in different years', () => {
    const value = new Date(2024, 5, 15) // June 15, 2024
    const result = formatDateRange(date1, value, 'MMM d, yyyy')

    expect(result).toBe('jan 1, 2023 • jun 15, 2024')
  })

  it('formats date range with same start and end date', () => {
    const result = formatDateRange(date1, date1, 'dd/MM/yyyy')

    expect(result).toBe('01/01/2023 • 01/01/2023')
  })
})
