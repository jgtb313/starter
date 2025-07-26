import { IEmails } from '@/interfaces'

import { SendOTP } from './SendOTP.email'
import { Welcome } from './Welcome.email'

export const emails: { [T in keyof IEmails]: React.FC<IEmails[T]> & { subject: string } } = {
  SEND_OTP: SendOTP,
  WELCOME: Welcome,
}
