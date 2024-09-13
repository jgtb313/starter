import { describe, it, expect } from 'vitest'

import { formatLatLng } from './formatLatLng'

describe('formatLatLng', () => {
  it('formats latitude and longitude as strings', () => {
    const result = formatLatLng('40.7128', '-74.0060')
    expect(result).toBe('40.7128,-74.0060')
  })

  it('formats latitude and longitude as numbers', () => {
    const result = formatLatLng(40.7128, -74.006)
    expect(result).toBe('40.7128,-74.006')
  })

  it('formats latitude as string and longitude as number', () => {
    const result = formatLatLng('40.7128', -74.006)
    expect(result).toBe('40.7128,-74.006')
  })

  it('formats latitude as number and longitude as string', () => {
    const result = formatLatLng(40.7128, '-74.0060')
    expect(result).toBe('40.7128,-74.0060')
  })

  it('handles zero values correctly', () => {
    const result = formatLatLng(0, 0)
    expect(result).toBe('0,0')
  })

  it('formats very high and very low values correctly', () => {
    const result = formatLatLng(90.0, -180.0)
    expect(result).toBe('90,-180')
  })

  it('handles string numbers correctly', () => {
    const result = formatLatLng('123.45', '67.89')
    expect(result).toBe('123.45,67.89')
  })
})
