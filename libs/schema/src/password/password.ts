import { z } from '@/zod'

export const PasswordSchema = z
	.string()
	.refine((password) => password.length >= 8, {
		params: {
			code: 'password.minLength',
		},
	})
	.refine((password) => password.length <= 64, {
		params: {
			code: 'password.maxLength',
		},
	})
	.refine((password) => /[a-z]/.test(password), {
		params: {
			code: 'password.minLowercase',
		},
	})
	.refine((password) => /[A-Z]/.test(password), {
		params: {
			code: 'password.minUppercase',
		},
	})
	.refine((password) => /[0-9]/.test(password), {
		params: {
			code: 'password.minNumbers',
		},
	})
	.refine((password) => /[^a-zA-Z0-9]/.test(password), {
		params: {
			code: 'password.minSymbols',
		},
	})
	.trim()
	.meta({
		description: 'A strong password.',
		examples: '07#M85_diJ0C',
	})
export type Password = z.infer<typeof PasswordSchema>
