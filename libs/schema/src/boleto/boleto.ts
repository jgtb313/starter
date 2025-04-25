import { z } from 'zod'

export const BoletoSchema = z.object({
  url: z.string().min(1),
  instructions: z.string().min(1),
  dueDate: z.iso.datetime().transform((value) => new Date(value)),
})
export type Boleto = z.infer<typeof BoletoSchema>
