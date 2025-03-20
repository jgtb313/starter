import { describe, it, expect } from 'vitest'

import { BaseAddressSchema, BusinessAddressSchema, CustomerAddressSchema } from './address'

describe('Address', () => {
  describe('BaseAddressSchema', () => {
    it('should validate a valid BaseAddress', () => {
      const validAddress = {
        id: 'address123',
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90001',
        neighborhood: 'Downtown',
        street: 'Main St',
        number: '123',
        complement: null,
      }

      expect(BaseAddressSchema.parse(validAddress)).toEqual(validAddress)
    })

    it('should fail validation when required fields are missing', () => {
      const invalidAddress = {
        id: 'address123',
      }

      expect(() => BaseAddressSchema.parse(invalidAddress)).toThrow()
    })

    it('should transform complement to null if undefined', () => {
      const validAddress = {
        id: 'address123',
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90001',
        neighborhood: 'Downtown',
        street: 'Main St',
        number: '123',
      }

      const result = BaseAddressSchema.parse(validAddress)
      expect(result.complement).toBeNull()
    })
  })

  describe('BusinessAddressSchema', () => {
    it('should validate a valid BusinessAddress', () => {
      const validBusinessAddress = {
        id: 'business123',
        state: 'NY',
        city: 'New York',
        zipCode: '10001',
        neighborhood: 'Manhattan',
        street: 'Wall St',
        number: '456',
        lat: 40.7128,
        lng: -74.006,
        complement: null,
        landmark: 'Near Central Park',
      }

      expect(BusinessAddressSchema.parse(validBusinessAddress)).toEqual(validBusinessAddress)
    })

    it('should fail validation if lat or lng are missing', () => {
      const invalidBusinessAddress = {
        id: 'business123',
        state: 'NY',
        city: 'New York',
        zipCode: '10001',
        neighborhood: 'Manhattan',
        street: 'Wall St',
        number: '456',
      }

      expect(() => BusinessAddressSchema.parse(invalidBusinessAddress)).toThrow()
    })
  })

  describe('CustomerAddressSchema', () => {
    it('should validate a valid CustomerAddress', () => {
      const validCustomerAddress = {
        id: 'customer123',
        title: 'Home',
        state: 'TX',
        city: 'Dallas',
        zipCode: '75201',
        neighborhood: 'Uptown',
        street: 'Elm St',
        number: '789',
        lat: 32.7767,
        lng: -96.797,
        complement: null,
        landmark: null,
        main: true,
      }

      expect(CustomerAddressSchema.parse(validCustomerAddress)).toEqual(validCustomerAddress)
    })

    it('should apply default value for main as false', () => {
      const validCustomerAddress = {
        id: 'customer123',
        title: 'Work',
        state: 'CA',
        city: 'San Francisco',
        zipCode: '94103',
        neighborhood: 'SOMA',
        street: 'Market St',
        number: '1000',
        lat: 37.7749,
        lng: -122.4194,
        complement: null,
        landmark: null,
      }

      const result = CustomerAddressSchema.parse(validCustomerAddress)
      expect(result.main).toBe(false)
    })

    it('should fail validation if title is missing', () => {
      const invalidCustomerAddress = {
        id: 'customer123',
        state: 'TX',
        city: 'Dallas',
        zipCode: '75201',
        neighborhood: 'Uptown',
        street: 'Elm St',
        number: '789',
        lat: 32.7767,
        lng: -96.797,
        complement: null,
        landmark: null,
      }

      expect(() => CustomerAddressSchema.parse(invalidCustomerAddress)).toThrow()
    })
  })
})
