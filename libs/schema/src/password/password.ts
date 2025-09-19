import { z } from '@/zod'

export const PasswordSchema = z
	.string()
	.min(8, {
		message: 'Password must be at least 8 characters long',
	})
	.max(64, {
		message: 'Password must be at most 64 characters long',
	})
	.regex(/[a-z]/, {
		message: 'Password must contain at least one lowercase letter',
	})
	.regex(/[A-Z]/, {
		message: 'Password must contain at least one uppercase letter',
	})
	.regex(/[0-9]/, {
		message: 'Password must contain at least one number',
	})
	.regex(/[^a-zA-Z0-9]/, {
		message: 'Password must contain at least one special character',
	})
	.trim()
export type Password = z.infer<typeof PasswordSchema>
