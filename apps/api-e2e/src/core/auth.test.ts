import { describe, it, expect } from 'vitest'
import client from '@starter/client'

describe('Auth', () => {
  it('test', async () => {
    const response = await client.auth.signIn({ email: 'jgtb313@gmail.com', password: '123123123' })

    expect(response.accessToken).toBeDefined()
  })
})
