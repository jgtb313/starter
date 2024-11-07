import { create } from 'zustand'
import client from '@starter/client'
import { makeRequest } from '@starter/use-hooks'

import { OTPState } from './OTP.store.types'

export const useOTP = create<OTPState>((set) => ({
  loadingValidateOTP: false,
  loadingSendUpdateEmailOTP: false,
  loadingSendUpdatePhoneOTP: false,

  async validateOTP(params, options) {
    return makeRequest(client.otp.validate, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingValidateOTP: true,
        }),
      onFinally: () =>
        set({
          loadingValidateOTP: false,
        }),
    })
  },

  async sendUpdateEmailOTP(params, options) {
    return makeRequest(client.otp.sendUpdateEmail, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingSendUpdateEmailOTP: true,
        }),
      onFinally: () =>
        set({
          loadingSendUpdateEmailOTP: false,
        }),
    })
  },

  async sendUpdatePhoneOTP(params, options) {
    return makeRequest(client.otp.sendUpdatePhone, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingSendUpdatePhoneOTP: true,
        }),
      onFinally: () =>
        set({
          loadingSendUpdatePhoneOTP: false,
        }),
    })
  },
}))
