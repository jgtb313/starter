import { SendOTP } from './send-otp.email'
import { Welcome } from './welcome.email'

import type { IEmails } from '@/interfaces'

export const emails: {
	[T in keyof IEmails]: React.FC<IEmails[T]> & {
		subject: string
	}
} = {
	SEND_OTP: SendOTP,
	WELCOME: Welcome,
}
