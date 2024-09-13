export enum OTPContextEnum {
  UPDATE_EMAIL = 'UPDATE_EMAIL'
}

export const OTPContexts = [
  {
    id: 'a74d53f5-d3ee-4576-af8e-5f9a43fbd123',
    context: OTPContextEnum.UPDATE_EMAIL,
    dailyLimitAttempts: 8,
    resendTime: 20,
    maxAttempts: 8,
    expiresIn: 12000,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
