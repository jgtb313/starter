/**
 * @name OTP
 * @description This module exposes functions
 *              related to the `/otps` path
 *
 * @module OTP
 **/

import { SendOTPInput, SendOTPOutput, ValidateOTPInput, ValidateOTPOutput, WithRecaptcha } from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'

/**
 * `POST /opts:send`
 * Makes a request to /opts:send
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 */
export const send = withFields<WithRecaptcha<SendOTPInput>, SendOTPOutput>(({ fields, ...input }) =>
  client.post('/opts:send', input, {
    params: { fields }
  })
)

/**
 * `POST /otps/:id:validate`
 * Makes a request to /otps/:id:validate
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 */
export const validate = withFields<WithRecaptcha<ValidateOTPInput>, ValidateOTPOutput>(({ fields, id, ...input }) =>
  client.post(`/otps/${id}:validate`, input, { params: { fields } })
)
