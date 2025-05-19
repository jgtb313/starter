import { z } from '@/zod'

const Url = z.url()
const ExpiresAt = z.iso.datetime()

export const BaseBoletoSchema = z.object({
  url: Url,
  expiresAt: ExpiresAt,
})
export type BaseBoleto = z.infer<typeof BoletoSchema>

export const BoletoSchema = z.object({
  url: Url,
  expiresAt: ExpiresAt.transform((value) => new Date(value)),
})
export type Boleto = z.infer<typeof BoletoSchema>
