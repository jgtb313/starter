import { z } from '@/zod'

export const LocaleSchema = z.enum([
	'pt-BR',
	'en',
	'es',
])
export type Locale = z.infer<typeof LocaleSchema>
