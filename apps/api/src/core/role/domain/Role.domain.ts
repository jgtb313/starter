import { RoleSchema, Role as IRole } from '@starter/schema'

import { setupDomain, SetupDomain } from '@/support/utilities'

export type RoleDomain = SetupDomain<IRole>

export class Role {
  state!: IRole

  constructor(role: RoleDomain) {
    Object.assign(this, {
      state: setupDomain(
        {
          ...role
        },
        RoleSchema
      )
    })
  }
}
