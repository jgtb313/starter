import { UserStatusEnum } from '@starter/schema'
import { uuid } from '@starter/shared'

import { User } from '@/core/user/domain'

export const userMocks: User[] = [
  new User({
    id: '1ylq82nZJybDbTZzEB6iBzbd5xF',
    name: 'John Doe',
    email: 'john.doe@acme.com',
    social: {
      google: { id: uuid() },
      facebook: null,
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
  }),

  new User({
    name: 'Jane Smith',
    email: 'jane.smith@beta.com',
    social: {
      google: null,
      facebook: { id: uuid() },
    },
    password: 'hashedPassword',
    status: UserStatusEnum.INACTIVE,
  }),

  new User({
    name: 'Alice Johnson',
    email: 'alice.johnson@gamma.com',
    social: {
      google: { id: uuid() },
      facebook: { id: uuid() },
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
    deletedAt: null,
  }),

  new User({
    name: 'Bob Brown',
    email: 'bob.brown@delta.com',
    social: {
      google: { id: uuid() },
      facebook: null,
    },
    password: 'hashedPassword',
    status: UserStatusEnum.INACTIVE,
  }),

  new User({
    name: 'Charlie Davis',
    email: 'charlie.davis@epsilon.com',
    social: {
      google: null,
      facebook: { id: uuid() },
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
  }),

  new User({
    name: 'Dave Evans',
    email: 'dave.evans@zeta.com',
    social: {
      google: { id: uuid() },
      facebook: { id: uuid() },
    },
    password: 'hashedPassword',
    status: UserStatusEnum.INACTIVE,
  }),

  new User({
    name: 'Eve Foster',
    email: 'eve.foster@theta.com',
    social: {
      google: null,
      facebook: null,
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
  }),

  new User({
    name: 'Frank Green',
    email: 'frank.green@iota.com',
    social: {
      google: { id: uuid() },
      facebook: { id: uuid() },
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
  }),

  new User({
    name: 'Grace Harris',
    email: 'grace.harris@kappa.com',
    social: {
      google: { id: uuid() },
      facebook: null,
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
  }),

  new User({
    name: 'Hank Isaac',
    email: 'hank.isaac@lambda.com',
    social: {
      google: { id: 'tokenRegisteredUser' },
      facebook: { id: 'tokenRegisteredUser' },
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
  }),

  new User({
    name: 'Leo Turner',
    email: 'leo.turner@lambda.com',
    social: {
      google: null,
      facebook: null,
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
  }),
]
