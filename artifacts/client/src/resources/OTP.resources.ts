/**
 * @name OTP
 * @description This module exposes functions
 *              related to the `/otps` path
 *
 * @module OTP
 **/

import {
  ValidateOTPInput,
  ValidateOTPOutput,
  SendUpdateEmailOTPInput,
  SendUpdateEmailOTPOutput,
  SendUpdatePhoneOTPInput,
  SendUpdatePhoneOTPOutput,
} from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'

/**
 * `POST /v1/otps/:id/validate`
 * Makes a request to /v1/otps/:id/validate
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const validate = withFields<ValidateOTPInput, ValidateOTPOutput>(({ fields, id, ...body }) =>
  client.post(`/v1/otps/${id}/validate`, body, { params: { fields } }),
)

/**
 * `POST /v1/otps/update-email`
 * Makes a request to /v1/otps/update-email
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const sendUpdateEmail = withFields<SendUpdateEmailOTPInput, SendUpdateEmailOTPOutput>(({ fields, ...body }) =>
  client.post('/v1/otps/update-email', body, { params: { fields } }),
)

/**
 * `POST /v1/otps/update-phone`
 * Makes a request to /v1/otps/update-phone
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 * @returns Resolves to the result of the request or an error.
 */
export const sendUpdatePhone = withFields<SendUpdatePhoneOTPInput, SendUpdatePhoneOTPOutput>(({ fields, ...body }) =>
  client.post('/v1/otps/update-phone', body, { params: { fields } }),
)
