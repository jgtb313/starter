export enum MailTemplateEnum {
  'SEND_OTP' = 'SEND_OTP'
}

export type MailSendOTPInput = {
  code: string
}

export type MailInput<T extends MailTemplateEnum> = {
  to: string
  template: T
  props: T extends MailTemplateEnum.SEND_OTP ? MailSendOTPInput : never
}

export type IMail = {
  send: <T extends MailTemplateEnum>(input: MailInput<T>) => Promise<void>
}
