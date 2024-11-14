/**
 * @name File
 * @description This module exposes functions
 *              related to the `/files` path
 *
 * @module File
 **/
import { RequestFilenameInput, RequestFilenameOutput, WithRecaptcha } from '@starter/schema'

import client from '@/request'
import { withFields } from '@/support'

/**
 * `POST /v1/files`
 * Makes a request to /v1/files
 *
 * @param {Object} body The body for the request.
 * @param {Object} [body.fields] The fields.
 *
 */
export const requestFilename = withFields<WithRecaptcha<RequestFilenameInput>, RequestFilenameOutput>(({ fields, ...input }) =>
  client.post('/v1/files', input, { params: { fields } }),
)
