import { z } from '@/zod'

export const PasswordSchema = z
	.string()
	.refine((password) => password.length >= 8, {
		params: {
			code: 'passwordMinLength',
		},
	})
	.refine((password) => password.length <= 64, {
		params: {
			code: 'passwordMaxLength',
		},
	})
	.refine((password) => /[a-z]/.test(password), {
		params: {
			code: 'passwordMinLowercase',
		},
	})
	.refine((password) => /[A-Z]/.test(password), {
		params: {
			code: 'passwordMinUppercase',
		},
	})
	.refine((password) => /[0-9]/.test(password), {
		params: {
			code: 'passwordMinNumbers',
		},
	})
	.refine((password) => /[^a-zA-Z0-9]/.test(password), {
		params: {
			code: 'passwordMinSymbols',
		},
	})
	.trim()
	.meta({
		description: 'A strong password.',
		examples: '07#M85_diJ0C',
	})
export type Password = z.infer<typeof PasswordSchema>
