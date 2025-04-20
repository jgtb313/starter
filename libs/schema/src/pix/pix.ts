import { z } from '@/zod'

export const PixSchema = z.object({
  qrCode: z.string().min(1),
  dueDate: z.coerce.date(),
})
export type Pix = z.infer<typeof PixSchema>
