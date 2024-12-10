export enum WhatsappTemplateEnum {
  'SEND_OTP' = 'SEND_OTP',
}

export type WhatsappSendOTPInput = {
  code: string
}

export type WhatsappInput<T extends WhatsappTemplateEnum> = {
  to: string
  template: T
  props: T extends WhatsappTemplateEnum.SEND_OTP ? WhatsappSendOTPInput : never
}

export type IWhatsapp = {
  send: <T extends WhatsappTemplateEnum>(input: WhatsappInput<T>) => Promise<void>
}
