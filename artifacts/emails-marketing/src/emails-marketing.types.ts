export enum EmailsEnum {
  SEND_OTP = 'SEND_OTP',
}

export type EmailsMarketing = {
  [EmailsEnum.SEND_OTP]: {
    code: string
  }
}
