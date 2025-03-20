import { IEmails } from '@/interfaces'

import { SendOTP } from './SendOTP.mail'
import { Welcome } from './Welcome.mail'

export const emails: { [T in keyof IEmails]: React.FC<IEmails[T]> & { subject: string } } = {
  SEND_OTP: SendOTP,
  WELCOME: Welcome,
}
