import { describe, it, expect } from 'vitest'
import { User, UserStatusEnum, RoleStatusEnum } from '@starter/domain'
import { AclForbiddenException } from '@starter/nestjs-error-handling'

import { ACLService } from './access-control.service'

const createUser = ({ roles, permissions }: Pick<User, 'roles' | 'permissions'>): User => ({
  userId: 'user-abc',
  workspaceId: 'workspace-xyz',
  organizationIds: [],
  organizations: [],
  roleIds: roles.map((role) => role.roleId),
  roles,
  permissions,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: {
    iso: 'BR',
    ddi: '+55',
    number: '98991143200',
  },
  avatar: null,
  social: {
    googleId: null,
    facebookId: null,
  },
  password: 'password',
  status: UserStatusEnum.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
})

describe('ACLService', () => {
  const aclService = new ACLService()

  describe('canPerformActionByPermission', () => {
    it('should deny action when user has no roles or permissions', () => {
      const user = createUser({ roles: [], permissions: [] })
      expect(() => aclService.canPerformActionByPermission(user, 'user:create')).toThrow(AclForbiddenException)
    })

    it('should allow user to read but deny creation or update', () => {
      const user = createUser({ roles: [], permissions: ['user:read'] })
      expect(() => aclService.canPerformActionByPermission(user, 'user:read')).not.toThrow()
      expect(() => aclService.canPerformActionByPermission(user, 'user:create')).toThrow(AclForbiddenException)
      expect(() => aclService.canPerformActionByPermission(user, 'user:update')).toThrow(AclForbiddenException)
    })

    it('should allow user to update but deny creation', () => {
      const user = createUser({ roles: [], permissions: ['user:update'] })
      expect(() => aclService.canPerformActionByPermission(user, 'user:update')).not.toThrow()
      expect(() => aclService.canPerformActionByPermission(user, 'user:create')).toThrow(AclForbiddenException)
    })

    it('should allow user with permission for a specific resource', () => {
      const user = createUser({
        roles: [],
        permissions: ['user:read'],
      })

      const resource = { workspaceId: 'workspace-xyz' }

      expect(() => aclService.canPerformActionByPermission(user, 'user:read', resource)).not.toThrow()
    })
  })

  describe('canPerformActionByRole', () => {
    it('should allow Manager role to manage actions', () => {
      const user = createUser({
        roles: [
          {
            roleId: 'role-manager',
            workspaceId: 'workspace-xyz',
            organizationIds: [],
            organizations: [],
            name: 'Manager',
            permissions: ['user:create', 'user:update'],
            tags: ['manager'],
            status: RoleStatusEnum.ACTIVE,
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        permissions: ['user:create'],
      })
      expect(() => aclService.canPerformActionByRole(user, 'Manager')).not.toThrow()
      expect(() => aclService.canPerformActionByPermission(user, 'user:update')).not.toThrow()
      expect(() => aclService.canPerformActionByPermission(user, 'user:create')).not.toThrow()
    })

    it('should deny action when user does not have the required role', () => {
      const user = createUser({
        roles: [
          {
            roleId: 'role-staff',
            workspaceId: 'workspace-xyz',
            organizationIds: [],
            organizations: [],
            name: 'Staff',
            permissions: ['user:read'],
            tags: ['staff'],
            status: RoleStatusEnum.ACTIVE,
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        permissions: ['user:read'],
      })

      expect(() => aclService.canPerformActionByRole(user, 'Manager')).toThrow(AclForbiddenException)
    })
  })
})
