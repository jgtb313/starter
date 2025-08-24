import type { SendOTPProps } from '@/emails/send-otp.email'
import type { WelcomeProps } from '@/emails/welcome.email'

export interface IEmails {
	SEND_OTP: SendOTPProps

	WELCOME: WelcomeProps
}
