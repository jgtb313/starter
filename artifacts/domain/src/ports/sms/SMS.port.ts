export enum SMSTemplateEnum {
  'SEND_OTP' = 'SEND_OTP',
}

export type SMSSendOTPInput = {
  code: string
}

export type SMSInput<T extends SMSTemplateEnum> = {
  to: string
  template: T
  props: T extends SMSTemplateEnum.SEND_OTP ? SMSSendOTPInput : never
}

export type ISMS = {
  send: <T extends SMSTemplateEnum>(input: SMSInput<T>) => Promise<void>
}
