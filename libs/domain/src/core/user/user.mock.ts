import { uuid } from '@starter/common'

import { UserDomain } from '@/core/user/user.domain'
import { UserInput, UserStatusEnum } from '@/core/user/user.schema'

type UserOverrides = Partial<UserInput>

export const makeUser = (overrides: UserOverrides): UserDomain => {
  const base: UserInput = {
    userId: uuid(),
    workspaceId: uuid(),
    scopes: [],
    permissions: [],
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: null,
    avatar: null,
    social: null,
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return new UserDomain({
    ...base,
    ...overrides,
  })
}

export const userMocks: UserDomain[] = [
  makeUser({
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: {
      iso: 'BR',
      ddi: '+55',
      number: '11999999999',
    },
    status: UserStatusEnum.ACTIVE,
  }),
  makeUser({ name: 'Bob Smith', email: 'bob.smith@example.com', status: UserStatusEnum.INACTIVE }),
  makeUser({ name: 'Carol White', email: 'carol.white@example.com', status: UserStatusEnum.ACTIVE }),
  makeUser({ name: 'David Lee', email: 'david.lee@example.com', status: UserStatusEnum.INACTIVE }),
  makeUser({ name: 'Eve Black', email: 'eve.black@example.com', status: UserStatusEnum.ACTIVE }),
  makeUser({ name: 'Frank Green', email: 'frank.green@example.com', status: UserStatusEnum.INACTIVE }),
  makeUser({ name: 'Grace Brown', email: 'grace.brown@example.com', status: UserStatusEnum.ACTIVE }),
  makeUser({ name: 'Henry Adams', email: 'henry.adams@example.com', status: UserStatusEnum.INACTIVE }),
  makeUser({ name: 'Isabel Clark', email: 'isabel.clark@example.com', status: UserStatusEnum.ACTIVE }),
  makeUser({ name: 'Jack Wilson', email: 'jack.wilson@example.com', status: UserStatusEnum.INACTIVE }),
]
