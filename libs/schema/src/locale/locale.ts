import { z } from '@/zod'

export const LocaleSchema = z.enum([
	'en',
	'es',
	'pt-BR',
])
export type Locale = z.infer<typeof LocaleSchema>
