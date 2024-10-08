import { UserStatusEnum } from '@starter/schema'
import { uuid } from '@starter/shared'

import { User } from '@/core/user/domain'
import { Workspace } from '@/core/workspace/domain'
import { workspaceMocks } from '@/core/workspace/Workspace.mock'

const [Workspace1, Workspace2, Workspace3] = workspaceMocks as [Workspace, Workspace, Workspace]

export const userMocks: User[] = [
  new User({
    workspaceId: Workspace1.state.id,
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
    workspaceId: Workspace2.state.id,
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
    workspaceId: Workspace3.state.id,
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
    workspaceId: Workspace3.state.id,
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
    workspaceId: Workspace3.state.id,
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
    workspaceId: Workspace1.state.id,
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
    workspaceId: Workspace1.state.id,
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
    workspaceId: Workspace1.state.id,
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
    workspaceId: Workspace2.state.id,
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
    workspaceId: Workspace2.state.id,
    name: 'Hank Isaac',
    email: 'hank.isaac@lambda.com',
    social: {
      google: { id: 'tokenRegisteredUser' },
      facebook: { id: 'tokenRegisteredUser' },
    },
    recoverPassword: {
      token: '5c47737e-ac15-45d9-8093-36374f131467',
      expiresIn: new Date(Date.now() - 60 * 1000),
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
  }),

  new User({
    workspaceId: Workspace2.state.id,
    name: 'Leo Turner',
    email: 'leo.turner@lambda.com',
    social: {
      google: null,
      facebook: null,
    },
    recoverPassword: {
      token: '7e78f837-d6e7-47df-9d9f-b50b9638e10a',
      expiresIn: new Date(Date.now() + 60 * 60 * 1000),
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
  }),
]
