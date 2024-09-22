import { vi } from 'vitest'

import { Role } from '@/core/role/domain'
import { IRoleRepository } from '@/ports/database/modules/Role.repository'

const roles: Record<string, Role> = {}

export const RoleRepositoryInMemory: ReturnType<IRoleRepository> = {
  index: vi.fn(async () => {
    return Object.values(roles)
  })
}
