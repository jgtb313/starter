import { describe, it, expect, beforeEach } from 'vitest'
import nock from 'nock'
import { StageEnum } from '@starter/config'

import { state } from '@/config'
import { request } from './request'

describe('request', () => {
  beforeEach(() => {
    state.stage = StageEnum.LOCAL
    state.authorization = undefined
  })

  it('should set the correct baseURL', async () => {
    state.baseURL = () => 'https://api.example.com'

    nock('https://api.example.com').get('/test').reply(200, { success: true })

    const response = await request.get('/test')

    expect(response).toEqual({ success: true })
  })

  it('should include Authorization header if state.authorization is set', async () => {
    state.authorization = 'token-123'
    state.baseURL = () => 'https://api.example.com'

    const scope = nock('https://api.example.com', {
      reqheaders: { Authorization: 'Bearer token-123' },
    })
      .get('/test')
      .reply(200, { success: true })

    const response = await request.get('/test')

    expect(response).toEqual({ success: true })
    scope.done()
  })

  it('should handle errors and reject with error data', async () => {
    state.baseURL = () => 'https://api.example.com'

    const errorResponse = {
      message: 'Bad Request',
    }

    nock('https://api.example.com').get('/error').reply(500, errorResponse)

    await expect(request.get('/error')).rejects.toEqual(errorResponse)
  })
})
