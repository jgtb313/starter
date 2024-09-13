import { describe, it, expect } from 'vitest'

import { isURL } from './isURL'

describe('isURL', () => {
  it('validates a simple HTTP URL', () => {
    expect(isURL('http://example.com')).toBe(true)
  })

  it('validates a simple HTTPS URL', () => {
    expect(isURL('https://example.com')).toBe(true)
  })

  it('validates a URL with a port', () => {
    expect(isURL('http://example.com:8080')).toBe(true)
  })

  it('validates a URL with a path', () => {
    expect(isURL('http://example.com/path/to/resource')).toBe(true)
  })

  it('validates a URL with query parameters', () => {
    expect(isURL('http://example.com/path?param=value')).toBe(true)
  })

  it('validates a URL with a fragment', () => {
    expect(isURL('http://example.com/path#fragment')).toBe(true)
  })

  it('validates an IP address as a URL', () => {
    expect(isURL('http://192.168.1.1')).toBe(true)
  })

  it('validates a URL with subdomains', () => {
    expect(isURL('http://sub.example.com')).toBe(true)
  })

  it('validates a URL without protocol', () => {
    expect(isURL('example.com')).toBe(true)
  })

  it('invalidates a malformed URL', () => {
    expect(isURL('http://-example.com')).toBe(false)
  })

  it('invalidates an empty string', () => {
    expect(isURL('')).toBe(false)
  })

  it('invalidates a string that is not a URL', () => {
    expect(isURL('not_a_url')).toBe(false)
  })
})
