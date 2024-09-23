import { WorkspaceStatusEnum } from '@starter/schema'

import { Workspace } from '@/core/workspace/domain'

export const workspaceMocks: Workspace[] = [
  new Workspace({
    name: 'Acme Corp',
    domain: 'acme',
    onboarding: true,
    status: WorkspaceStatusEnum.ACTIVE
  }),

  new Workspace({
    name: 'Beta Inc',
    domain: 'beta',
    onboarding: false,
    status: WorkspaceStatusEnum.ACTIVE
  }),

  new Workspace({
    name: 'Gamma LLC',
    domain: 'gamma',
    onboarding: true,
    status: WorkspaceStatusEnum.ACTIVE
  }),

  new Workspace({
    name: 'Delta Corp',
    domain: 'delta',
    onboarding: false,
    status: WorkspaceStatusEnum.ACTIVE
  }),

  new Workspace({
    name: 'Epsilon Ltd',
    domain: 'epsilon',
    onboarding: true,
    status: WorkspaceStatusEnum.ACTIVE
  }),

  new Workspace({
    name: 'Zeta Group',
    domain: 'zeta',
    onboarding: false,
    status: WorkspaceStatusEnum.ACTIVE
  }),

  new Workspace({
    name: 'Theta Systems',
    domain: 'theta',
    onboarding: true,
    status: WorkspaceStatusEnum.ACTIVE
  }),

  new Workspace({
    name: 'Iota Solutions',
    domain: 'iota',
    onboarding: true,
    status: WorkspaceStatusEnum.ACTIVE
  }),

  new Workspace({
    name: 'Kappa Ventures',
    domain: 'kappa',
    onboarding: false,
    status: WorkspaceStatusEnum.ACTIVE
  }),

  new Workspace({
    name: 'Lambda Innovations',
    domain: 'lambda',
    onboarding: true,
    status: WorkspaceStatusEnum.ACTIVE
  })
]
