export enum OTPChannelEnum {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}

export enum OTPPhoneChannelEnum {
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}

export enum OTPContextEnum {
  UPDATE_EMAIL = 'UPDATE_EMAIL',
  UPDATE_PHONE = 'UPDATE_PHONE',
}

export const OTPContexts = [
  {
    id: '2nIKjVyfJJvj2kEorugXTQbkkgB',
    context: OTPContextEnum.UPDATE_EMAIL,
    dailyLimitAttempts: 5,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2nIKkOP5vlPKbaGHv5E1n0bJiYW',
    context: OTPContextEnum.UPDATE_PHONE,
    dailyLimitAttempts: 5,
    resendTime: 60,
    maxAttempts: 4,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
