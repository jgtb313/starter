import client from '@starter/client'
import { RequestOptions } from '@starter/use-hooks'

export type OTPState = {
  loadingValidateOTP: boolean
  loadingSendForgotPasswordOTP: boolean
  loadingSendUpdateEmailOTP: boolean
  loadingSendUpdatePhoneOTP: boolean

  validateOTP: RequestOptions<typeof client.otp.validate>
  sendForgotPasswordOTP: RequestOptions<typeof client.otp.sendForgotPassword>
  sendUpdateEmailOTP: RequestOptions<typeof client.otp.sendUpdateEmail>
  sendUpdatePhoneOTP: RequestOptions<typeof client.otp.sendUpdatePhone>
}
