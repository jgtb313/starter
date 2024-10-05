export enum MailTemplateEnum {
  'FORGOT_PASSWORD' = 'FORGOT_PASSWORD',
  'SEND_OTP' = 'SEND_OTP'
}

export type MailSendOTPInput = {
  code: string
}

export type MailForgotPasswordInput = {
  userName: string
  recoverPasswordBaseUrl: string
}

export type MailInput<T extends MailTemplateEnum> = {
  to: string
  template: T
  props: T extends MailTemplateEnum.SEND_OTP ? MailSendOTPInput : T extends MailTemplateEnum.FORGOT_PASSWORD ? MailForgotPasswordInput : never
}

export type IMail = {
  send: <T extends MailTemplateEnum>(input: MailInput<T>) => Promise<void>
}
