import { z } from 'zod'

export const BoletoSchema = z.object({
  url: z.string().min(1),
  instructions: z.string().min(1),
  dueDate: z.coerce.date(),
})
