import { z } from '@/zod'

const Url = z.url()

const ExpiresAt = z.iso.datetime().meta({
	description: 'Expiration date and time for the Boleto payment in ISO format.',
	examples: [
		'2025-12-31T23:59:59.000Z',
	],
})

export const BaseBoletoSchema = z.object({
	url: Url,
	expiresAt: ExpiresAt,
})
export type BaseBoleto = z.infer<typeof BaseBoletoSchema>

export const BoletoSchema = z.object({
	url: Url,
	expiresAt: ExpiresAt.transform((value) => new Date(value)),
})
export type Boleto = z.infer<typeof BoletoSchema>
