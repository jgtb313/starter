import { describe, expect, it } from 'vitest'

import {
	type BaseAddress,
	BaseAddressSchema,
	type BusinessAddress,
	BusinessAddressSchema,
	type CustomerAddress,
	CustomerAddressSchema,
} from './address'

describe('Address Schemas', () => {
	describe('BaseAddressSchema', () => {
		it('should validate a valid BaseAddress', () => {
			const input: BaseAddress = {
				state: 'CA',
				city: 'Los Angeles',
				zipCode: '90001',
				neighborhood: 'Downtown',
				street: 'Main St',
				number: '123',
				complement: null,
				landmark: null,
			}

			expect(BaseAddressSchema.parse(input)).toEqual(input)
		})

		it('should fail validation when required fields are missing', () => {
			const input = {
				state: 'CA',
			}

			expect(() => BaseAddressSchema.parse(input)).toThrow()
		})

		it('should transform complement to null if undefined', () => {
			const input = {
				state: 'CA',
				city: 'Los Angeles',
				zipCode: '90001',
				neighborhood: 'Downtown',
				street: 'Main St',
				number: '123',
			}

			const parsed = BaseAddressSchema.parse(input)

			expect(parsed.complement).toBeNull()
		})
	})

	describe('BusinessAddressSchema', () => {
		it('should validate a valid BusinessAddress', () => {
			const input: BusinessAddress = {
				state: 'NY',
				city: 'New York',
				zipCode: '10001',
				neighborhood: 'Manhattan',
				street: 'Wall St',
				number: '456',
				location: {
					lat: '40.7128',
					lng: '-74.0060',
				},
				complement: null,
				landmark: 'Near Central Park',
			}

			expect(BusinessAddressSchema.parse(input)).toEqual(input)
		})

		it('should fail validation if location is missing', () => {
			const input = {
				state: 'NY',
				city: 'New York',
				zipCode: '10001',
				neighborhood: 'Manhattan',
				street: 'Wall St',
				number: '456',
				complement: null,
				landmark: 'Near Central Park',
			}

			expect(() => BusinessAddressSchema.parse(input)).toThrow()
		})

		it('should transform complement and landmark to null if undefined', () => {
			const input = {
				state: 'NY',
				city: 'New York',
				zipCode: '10001',
				neighborhood: 'Manhattan',
				street: 'Wall St',
				number: '456',
				location: {
					lat: '40.7128',
					lng: '-74.0060',
				},
			}

			const parsed = BusinessAddressSchema.parse(input)

			expect(parsed.complement).toBeNull()
			expect(parsed.landmark).toBeNull()
		})
	})

	describe('CustomerAddressSchema', () => {
		it('should validate a valid CustomerAddress', () => {
			const input: CustomerAddress = {
				title: 'Home',
				state: 'TX',
				city: 'Dallas',
				zipCode: '75201',
				neighborhood: 'Uptown',
				street: 'Elm St',
				number: '789',
				location: {
					lat: '32.7767',
					lng: '-96.7970',
				},
				complement: null,
				landmark: null,
				main: true,
			}

			expect(CustomerAddressSchema.parse(input)).toEqual(input)
		})

		it('should apply default value for main as false', () => {
			const customerAddressWithoutMain = {
				title: 'Work',
				state: 'CA',
				city: 'San Francisco',
				zipCode: '94103',
				neighborhood: 'SOMA',
				street: 'Market St',
				number: '1000',
				location: {
					lat: '37.7749',
					lng: '-122.4194',
				},
				complement: null,
				landmark: null,
			}

			const parsed = CustomerAddressSchema.parse(customerAddressWithoutMain)
			expect(parsed.main).toBe(false)
		})

		it('should fail validation if title is missing', () => {
			const input = {
				state: 'TX',
				city: 'Dallas',
				zipCode: '75201',
				neighborhood: 'Uptown',
				street: 'Elm St',
				number: '789',
				location: {
					lat: '32.7767',
					lng: '-96.7970',
				},
				complement: null,
				landmark: null,
			}

			expect(() => CustomerAddressSchema.parse(input)).toThrow()
		})
	})
})
