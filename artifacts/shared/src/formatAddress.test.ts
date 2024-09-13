import { describe, it, expect } from 'vitest'
import { formatAddress, FormatAddressInput } from './formatAddress'

describe('formatAddress', () => {
  it('formats full address correctly', () => {
    const address: FormatAddressInput = {
      state: 'SP',
      city: 'São Paulo',
      street: 'Rua A',
      number: '123',
      neighborhood: 'Centro',
      zipcode: '12345678',
      complement: null
    }

    const result = formatAddress(address)

    expect(result).toBe('Rua A, 123 • Centro, CEP 12345-678')
  })

  it('formats address correctly without zipcode', () => {
    const address: FormatAddressInput = {
      street: 'Rua A',
      number: '123',
      neighborhood: 'Centro'
    }

    const result = formatAddress(address)

    expect(result).toBe('Rua A, 123 • Centro')
  })

  it('formats short address correctly', () => {
    const address: FormatAddressInput = {
      street: 'Rua A',
      number: '123',
      neighborhood: 'Centro'
    }

    const result = formatAddress(address, { short: true })

    expect(result).toBe('Rua A, 123')
  })

  it('formats short address correctly without number', () => {
    const address: FormatAddressInput = {
      street: 'Rua A',
      neighborhood: 'Centro'
    }

    const result = formatAddress(address, { short: true })

    expect(result).toBe('Rua A')
  })

  it('formats place correctly', () => {
    const address: FormatAddressInput = {
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      street: 'Rua A',
      number: '123'
    }

    const result = formatAddress(address, { place: true })

    expect(result).toBe('Centro, São Paulo - SP')
  })

  it('formats with complement correctly', () => {
    const address: FormatAddressInput = {
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Centro',
      complement: 'Apto 101',
      street: 'Rua A',
      number: '123'
    }

    const result = formatAddress(address, { complement: true })

    expect(result).toBe('Apto 101 - São Paulo/SP')
  })

  it('formats with complement as empty string correctly', () => {
    const address: FormatAddressInput = {
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Centro',
      complement: '',
      street: 'Rua A',
      number: '123'
    }

    const result = formatAddress(address, { complement: true })

    expect(result).toBe('São Paulo/SP')
  })

  it('formats with no state and city correctly', () => {
    const address: FormatAddressInput = {
      street: 'Rua A',
      number: '123',
      neighborhood: 'Centro'
    }

    const result = formatAddress(address, { place: true })

    expect(result).toBe('Centro, undefined - undefined')
  })
})
