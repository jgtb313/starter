import { create } from 'zustand'
import client from '@starter/client'
import { makeRequest } from '@starter/use-hooks'

import { useStore } from '@/Store.context'
import { OTPState } from './OTP.store.types'

export const useOTP = create<OTPState>((set) => ({
  loadingValidateOTP: false,
  loadingSendForgotPasswordOTP: false,
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
      onError: useStore.getState().onError,
    })
  },

  async sendForgotPasswordOTP(params, options) {
    return makeRequest(client.otp.sendForgotPassword, {
      params,
      options,
      onPreFetch: () =>
        set({
          loadingSendForgotPasswordOTP: true,
        }),
      onFinally: () =>
        set({
          loadingSendForgotPasswordOTP: false,
        }),
      onError: useStore.getState().onError,
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
      onError: useStore.getState().onError,
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
      onError: useStore.getState().onError,
    })
  },
}))
