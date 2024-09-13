import { z } from '@/zod'
import { startOfDay, endOfDay, isBefore, formatDate } from '@starter/shared'

import { DateSchema } from '../date'

export const DurationSchema = z
  .object({
    startAt: DateSchema,
    endAt: DateSchema
  })
  .transform(({ startAt, endAt }) => ({
    startAt: startOfDay(startAt),
    endAt: endOfDay(endAt)
  }))
  .refine(
    ({ startAt, endAt }) => {
      return isBefore(startAt, endAt)
    },
    ({ endAt }) => ({ path: ['startAt'], message: `Deve ser antes de ${formatDate(endAt, 'dd/MM/yyyy')}` })
  )
  .refine(
    ({ startAt, endAt }) => {
      return !isBefore(endAt, startAt)
    },
    ({ startAt }) => ({ path: ['endAt'], message: `Deve ser depois de ${formatDate(startAt, 'dd/MM/yyyy')}` })
  )
export type Durartion = z.infer<typeof DurationSchema>
