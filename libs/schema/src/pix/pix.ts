import { z } from '@/zod'

const QrCodeUrl = z.url().meta({
	description:
		'URL containing the Pix QR Code payload, used to initiate a payment.',
	examples: [
		'https://pix.example.com/v2/9c1b2841-d993-48a7-bb75-61b460bdbb69',
	],
})

const ExpiresAt = z.iso.datetime().meta({
	description: 'Expiration date and time for the Pix payment in ISO format.',
	examples: [
		'2025-12-31T23:59:59.000Z',
	],
})

export const BasePixSchema = z.object({
	qrCodeUrl: QrCodeUrl,
	expiresAt: ExpiresAt,
})
export type BasePix = z.infer<typeof BasePixSchema>

export const PixSchema = z.object({
	qrCodeUrl: QrCodeUrl,
	expiresAt: ExpiresAt.transform((value) => new Date(value)),
})
export type Pix = z.infer<typeof PixSchema>
