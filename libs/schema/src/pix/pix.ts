import { z } from '@/zod'

export const PixSchema = z.object({
  qrCode: z.string().min(1),
  dueDate: z.iso.datetime().transform((value) => new Date(value)),
})
export type Pix = z.infer<typeof PixSchema>
