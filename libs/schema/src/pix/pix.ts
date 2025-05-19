import { z } from '@/zod'

const QrCodeUrl = z.url().meta({
  description: 'Direct URL to the Pix QR Code, returned by the payment provider.',
  examples: ['https://pix.qr-code.com/abc123'],
})

const ExpiresAt = z.iso.datetime().meta({
  description: 'Expiration date and time for the Pix payment in ISO format.',
  examples: ['2025-12-31T23:59:59.000Z'],
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
