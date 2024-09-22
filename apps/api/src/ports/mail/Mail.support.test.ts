import { describe, expect, it } from 'vitest'

import { getSubject } from './Mail.support'

describe('getSubject', () => {
  it('should return the title from a valid HTML string', () => {
    const input = '<html><head><title>Test Title</title></head><body></body></html>'
    const output = getSubject(input)

    expect(output).toBe('Test Title')
  })

  it('should return an empty string if title tags are not present', () => {
    const input = '<html><head></head><body></body></html>'
    const output = getSubject(input)

    expect(output).toBe('')
  })

  it('should return the correct title when there are multiple title tags', () => {
    const input = '<html><head><title>First Title</title><title>Second Title</title></head><body></body></html>'
    const output = getSubject(input)

    expect(output).toBe('First Title')
  })

  it('should handle spaces and special characters in the title', () => {
    const input = '<html><head><title>Title with spaces & special characters !@#</title></head><body></body></html>'
    const output = getSubject(input)

    expect(output).toBe('Title with spaces & special characters !@#')
  })

  it('should return an empty string if the title is empty', () => {
    const input = '<html><head><title></title></head><body></body></html>'
    const output = getSubject(input)

    expect(output).toBe('')
  })
})
