import { describe, it, expect } from 'vitest'
import { ConflictException } from '@starter/nestjs-error-handling'

import { RoleStatusEnum } from '@/core/role/role.schema'
import { makeRole } from '@/core/role/role.mock'

describe('RoleDomain', () => {
  it('should return true for isActive when status is ACTIVE', () => {
    const role = makeRole({ status: RoleStatusEnum.ACTIVE })
    expect(role.isActive()).toBe(true)
  })

  it('should return false for isActive when status is INACTIVE', () => {
    const role = makeRole({ status: RoleStatusEnum.INACTIVE })
    expect(role.isActive()).toBe(false)
  })

  it('should return true for isInactive when status is INACTIVE', () => {
    const role = makeRole({ status: RoleStatusEnum.INACTIVE })
    expect(role.isInactive()).toBe(true)
  })

  it('should return false for isInactive when status is ACTIVE', () => {
    const role = makeRole({ status: RoleStatusEnum.ACTIVE })
    expect(role.isInactive()).toBe(false)
  })

  it('should allow marking role as active when inactive', () => {
    const role = makeRole({ status: RoleStatusEnum.INACTIVE })
    role.markAsActive()
    expect(role.isActive()).toBe(true)
  })

  it('should throw when marking role as active if already active', () => {
    const role = makeRole({ status: RoleStatusEnum.ACTIVE })
    expect(() => role.markAsActive()).toThrowError(new ConflictException('This role is already active.'))
  })

  it('should allow marking role as inactive when active', () => {
    const role = makeRole({ status: RoleStatusEnum.ACTIVE })
    role.markAsInactive()
    expect(role.isInactive()).toBe(true)
  })

  it('should throw when marking role as inactive if already inactive', () => {
    const role = makeRole({ status: RoleStatusEnum.INACTIVE })
    expect(() => role.markAsInactive()).toThrowError(new ConflictException('This role is already inactive.'))
  })
})
