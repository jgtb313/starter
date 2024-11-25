export enum EmailsEnum {
  SEND_OTP = 'SendOTP',
}

export type EmailsMarketing = {
  [EmailsEnum.SEND_OTP]: {
    code: string
  }
}
