import { UserStatusEnum } from '@starter/schema'
import { uuid } from '@starter/shared'

import { User } from '@/core/user/domain'
import { Workspace } from '@/core/workspace/domain'
import { workspaceMocks } from '@/core/workspace/Workspace.mock'

const [Workspace1, Workspace2, Workspace3] = workspaceMocks as [Workspace, Workspace, Workspace]

export const userMocks: User[] = [
  new User({
    workspaceId: Workspace1.state.id,
    workspace: Workspace1.state,
    name: 'John Doe',
    email: 'john.doe@acme.com',
    social: {
      google: { id: uuid() },
      facebook: null
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE
  }),

  new User({
    workspaceId: Workspace2.state.id,
    workspace: Workspace2.state,
    name: 'Jane Smith',
    email: 'jane.smith@beta.com',
    social: {
      google: null,
      facebook: { id: uuid() }
    },
    password: 'hashedPassword',
    status: UserStatusEnum.INACTIVE
  }),

  new User({
    workspaceId: Workspace3.state.id,
    workspace: Workspace3.state,
    name: 'Alice Johnson',
    email: 'alice.johnson@gamma.com',
    social: {
      google: { id: uuid() },
      facebook: { id: uuid() }
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE,
    deletedAt: null
  }),

  new User({
    workspaceId: Workspace3.state.id,
    workspace: Workspace3.state,
    name: 'Bob Brown',
    email: 'bob.brown@delta.com',
    social: {
      google: { id: uuid() },
      facebook: null
    },
    password: 'hashedPassword',
    status: UserStatusEnum.INACTIVE
  }),

  new User({
    workspaceId: Workspace3.state.id,
    workspace: Workspace3.state,
    name: 'Charlie Davis',
    email: 'charlie.davis@epsilon.com',
    social: {
      google: null,
      facebook: { id: uuid() }
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE
  }),

  new User({
    workspaceId: Workspace1.state.id,
    workspace: Workspace1.state,
    name: 'Dave Evans',
    email: 'dave.evans@zeta.com',
    social: {
      google: { id: uuid() },
      facebook: { id: uuid() }
    },
    password: 'hashedPassword',
    status: UserStatusEnum.INACTIVE
  }),

  new User({
    workspaceId: Workspace1.state.id,
    workspace: Workspace1.state,
    name: 'Eve Foster',
    email: 'eve.foster@theta.com',
    social: {
      google: null,
      facebook: null
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE
  }),

  new User({
    workspaceId: Workspace1.state.id,
    workspace: Workspace1.state,
    name: 'Frank Green',
    email: 'frank.green@iota.com',
    social: {
      google: { id: uuid() },
      facebook: { id: uuid() }
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE
  }),

  new User({
    workspaceId: Workspace2.state.id,
    workspace: Workspace2.state,
    name: 'Grace Harris',
    email: 'grace.harris@kappa.com',
    social: {
      google: { id: uuid() },
      facebook: null
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE
  }),

  new User({
    workspaceId: Workspace2.state.id,
    workspace: Workspace2.state,
    name: 'Hank Isaac',
    email: 'hank.isaac@lambda.com',
    social: {
      google: null,
      facebook: null
    },
    password: 'hashedPassword',
    status: UserStatusEnum.ACTIVE
  })
]
