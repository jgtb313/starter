import { z } from '@starter/schema'

export const OTPContext = z.enum([
	'PASSWORD_LESS',
	'FORGOT_PASSWORD',
	'UPDATE_EMAIL',
	'UPDATE_PHONE',
])
export type OTPContext = z.infer<typeof OTPContext>
