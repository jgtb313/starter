import { describe, it, expect } from 'vitest'
import { ConflictException } from '@starter/nestjs-error-handling'
import { uuid } from '@starter/common'

import { UserStatusEnum } from '@/core/user/user.schema'
import { makeUser } from '@/core/user/user.mock'

describe('UserDomain', () => {
  it('should return true for isActive when status is ACTIVE', () => {
    const user = makeUser({ status: UserStatusEnum.ACTIVE })
    expect(user.isActive()).toBe(true)
  })

  it('should return false for isActive when status is INACTIVE', () => {
    const user = makeUser({ status: UserStatusEnum.INACTIVE })
    expect(user.isActive()).toBe(false)
  })

  it('should return true for isInactive when status is INACTIVE', () => {
    const user = makeUser({ status: UserStatusEnum.INACTIVE })
    expect(user.isInactive()).toBe(true)
  })

  it('should return false for isInactive when status is ACTIVE', () => {
    const user = makeUser({ status: UserStatusEnum.ACTIVE })
    expect(user.isInactive()).toBe(false)
  })

  it('should allow marking user as active when inactive', () => {
    const user = makeUser({ status: UserStatusEnum.INACTIVE })
    user.markAsActive()
    expect(user.isActive()).toBe(true)
  })

  it('should throw when marking user as active if already active', () => {
    const user = makeUser({ status: UserStatusEnum.ACTIVE })
    expect(() => user.markAsActive()).toThrowError(new ConflictException('This user is already active.'))
  })

  it('should allow marking user as inactive when active', () => {
    const user = makeUser({ status: UserStatusEnum.ACTIVE })
    user.markAsInactive()
    expect(user.isInactive()).toBe(true)
  })

  it('should throw when marking user as inactive if already inactive', () => {
    const user = makeUser({ status: UserStatusEnum.INACTIVE })
    expect(() => user.markAsInactive()).toThrowError(new ConflictException('This user is already inactive.'))
  })

  describe('assignToWorkspace', () => {
    it('should assign workspaceId if none is assigned', () => {
      const user = makeUser({ workspaceId: null })
      const newWorkspaceId = 'workspace-123'
      user.assignToWorkspace(newWorkspaceId)
      expect(user.state.workspaceId).toBe(newWorkspaceId)
    })

    it('should throw if workspaceId is already assigned', () => {
      const existingWorkspaceId = uuid()
      const user = makeUser({ workspaceId: existingWorkspaceId })
      expect(() => user.assignToWorkspace('workspace-123')).toThrowError(new ConflictException('This user is already assigned to a workspace.'))
    })
  })
})
