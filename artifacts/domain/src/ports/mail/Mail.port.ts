import { EmailsEnum, EmailsMarketing } from '@starter/emails-marketing'

export type MailInput<T extends EmailsEnum> = {
  to: string
  template: T
  props: EmailsMarketing[T]
}

export type IMail = {
  send: <T extends EmailsEnum>(input: MailInput<T>) => Promise<void>
}
