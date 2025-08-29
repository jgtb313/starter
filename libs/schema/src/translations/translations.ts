import { z } from '@/zod'

import { LocaleSchema } from '@/locale'

export const TranslationsSchema = z
	.record(LocaleSchema, z.string())
	.refine(
		(data) => data['pt-BR'] !== undefined && data['pt-BR'].trim() !== '',
		{
			message: 'O campo ptBR é obrigatório e não pode ser vazio',
			path: [
				'pt-BR',
			],
		},
	)
export type Translations = z.infer<typeof TranslationsSchema>
