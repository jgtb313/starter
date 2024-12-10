import { describe, expect, it } from 'vitest'
import { UserStatusEnum } from '@starter/schema'

import { User } from './User.domain'

describe('User', () => {
  it('should mount user correctly', () => {
    const user = new User({
      id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
      name: 'John Doe',
      email: 'john.doe@acme.com',
      social: {
        google: null,
        facebook: null,
      },
      password: 'hashedPassword',
      status: UserStatusEnum.ACTIVE,
    })

    expect(user).toBeDefined()
  })
})
