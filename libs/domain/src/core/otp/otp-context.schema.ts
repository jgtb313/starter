import { z } from '@starter/schema'

export const OTPContextSchema = z
	.enum([
		'PASSWORD_LESS',
		'FORGOT_PASSWORD',
		'UPDATE_EMAIL',
		'UPDATE_PHONE',
	])
	.meta({
		description: 'Business scenario for which the OTP is generated',
		example: 'PASSWORD_LESS',
	})
export type OTPContext = z.infer<typeof OTPContextSchema>
export type OTPContextInput = z.input<typeof OTPContextSchema>
