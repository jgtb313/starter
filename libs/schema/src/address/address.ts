import { clearSpecialChars } from '@starter/common'

import { z } from '@/zod'
import { LocationSchema } from '../location'

const Title = z
	.string()
	.trim()
	.min(1)
	.meta({
		description: 'Label used to identify the address (e.g., Home, Office).',
		examples: [
			'Home',
		],
	})

const State = z
	.string()
	.trim()
	.min(1)
	.meta({
		description:
			'Two-letter state code following the ISO 3166-2 standard for country subdivisions.',
		examples: [
			'CA',
		],
	})

const City = z
	.string()
	.trim()
	.min(1)
	.meta({
		description: 'City name.',
		examples: [
			'Los Angeles',
		],
	})

const ZipCode = z
	.string()
	.trim()
	.min(1)
	.transform((value) => clearSpecialChars(value).replace(/\s+/g, ''))
	.meta({
		description: 'ZIP or postal code, containing digits only.',
		examples: [
			'90210000',
		],
	})

const Neighborhood = z
	.string()
	.trim()
	.min(1)
	.meta({
		description: 'Neighborhood or district name.',
		examples: [
			'Downtown',
		],
	})

const Street = z
	.string()
	.trim()
	.min(1)
	.meta({
		description: 'Street name.',
		examples: [
			'Sunset Blvd',
		],
	})

const StreetNumber = z
	.string()
	.trim()
	.min(1)
	.meta({
		description: 'Street number.',
		examples: [
			'1234',
		],
	})

const Complement = z
	.string()
	.nullish()
	.transform((value) => value ?? null)
	.meta({
		description: 'Additional address details (optional).',
		examples: [
			'Apt 202',
		],
	})

const Landmark = z
	.string()
	.nullish()
	.transform((value) => value ?? null)
	.meta({
		description: 'Nearby reference point (optional).',
		examples: [
			'Near the central park',
		],
	})

const Main = z
	.boolean()
	.default(false)
	.meta({
		description: 'Indicates if this is the primary address.',
		examples: [
			true,
		],
	})

export const BaseAddressSchema = z.object({
	state: State,
	city: City,
	zipCode: ZipCode,
	neighborhood: Neighborhood,
	street: Street,
	number: StreetNumber,
	complement: Complement,
})
export type BaseAddress = z.infer<typeof BaseAddressSchema>

export const BusinessAddressSchema = z.object({
	state: State,
	city: City,
	zipCode: ZipCode,
	neighborhood: Neighborhood,
	street: Street,
	number: StreetNumber,
	location: LocationSchema,
	complement: Complement,
	landmark: Landmark,
})
export type BusinessAddress = z.infer<typeof BusinessAddressSchema>

export const CustomerAddressSchema = z.object({
	title: Title,
	state: State,
	city: City,
	zipCode: ZipCode,
	neighborhood: Neighborhood,
	street: Street,
	number: StreetNumber,
	location: LocationSchema,
	complement: Complement,
	landmark: Landmark,
	main: Main,
})
export type CustomerAddress = z.infer<typeof CustomerAddressSchema>
