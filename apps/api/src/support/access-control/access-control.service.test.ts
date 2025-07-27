// import { describe, it, expect } from 'vitest'
// import { User, UserStatusEnum, RoleStatusEnum, OrganizationStatusEnum } from '@starter/domain'
// import { AclForbiddenException } from '@starter/nestjs-error-handling'

// import { ACLService } from './access-control.service'

// const createUser = ({ organizations = [], roles, permissions }: Pick<User, 'organizations' | 'roles' | 'permissions'>): User => ({
//   userId: 'user-abc',
//   workspaceId: 'workspace-xyz',
//   organizationIds: organizations.map((organization) => organization.organizationId),
//   organizations,
//   roleIds: roles.map((role) => role.roleId),
//   roles,
//   permissions,
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   phone: {
//     iso: 'BR',
//     ddi: '+55',
//     number: '98991143200',
//   },
//   avatar: null,
//   social: {
//     googleId: null,
//     facebookId: null,
//   },
//   password: 'password',
//   status: UserStatusEnum.ACTIVE,
//   createdAt: new Date(),
//   updatedAt: new Date(),
// })

// describe('ACLService', () => {
//   const aclService = new ACLService()

//   describe('canPerformActionByPermission', () => {
//     it('should deny action when user has no roles or permissions', () => {
//       const user = createUser({ organizations: [], roles: [], permissions: [] })
//       expect(() => aclService.canPerformActionByPermission(user, 'user:create')).toThrow(AclForbiddenException)
//     })

//     it('should allow user to read but deny creation or update', () => {
//       const user = createUser({ organizations: [], roles: [], permissions: ['user:read'] })
//       expect(() => aclService.canPerformActionByPermission(user, 'user:read')).not.toThrow()
//       expect(() => aclService.canPerformActionByPermission(user, 'user:create')).toThrow(AclForbiddenException)
//       expect(() => aclService.canPerformActionByPermission(user, 'user:update')).toThrow(AclForbiddenException)
//     })

//     it('should allow user to update but deny creation', () => {
//       const user = createUser({ organizations: [], roles: [], permissions: ['user:update'] })
//       expect(() => aclService.canPerformActionByPermission(user, 'user:update')).not.toThrow()
//       expect(() => aclService.canPerformActionByPermission(user, 'user:create')).toThrow(AclForbiddenException)
//     })

//     it('should allow user with permission for a specific resource', () => {
//       const user = createUser({ organizations: [], roles: [], permissions: ['user:read'] })
//       const resource = { workspaceId: 'workspace-xyz' }

//       expect(() => aclService.canPerformActionByPermission(user, 'user:read', resource)).not.toThrow()
//     })

//     it('should allow user with correct organizationId', () => {
//       const user = createUser({
//         organizations: [
//           {
//             organizationId: 'org-zxc',
//             workspaceId: 'workspace-xyz',
//             name: 'Org',
//             status: OrganizationStatusEnum.ACTIVE,
//             deletedAt: null,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           },
//         ],
//         roles: [],
//         permissions: ['user:read'],
//       })
//       const resource = { workspaceId: 'workspace-xyz', organizationId: 'org-zxc' }
//       expect(() => aclService.canPerformActionByPermission(user, 'user:read', resource)).not.toThrow()
//     })

//     it('should deny user with different organizationId', () => {
//       const user = createUser({
//         organizations: [
//           {
//             organizationId: 'org-zxc',
//             workspaceId: 'workspace-xyz',
//             name: 'Org',
//             status: OrganizationStatusEnum.ACTIVE,
//             deletedAt: null,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           },
//         ],
//         roles: [],
//         permissions: ['user:read'],
//       })
//       const resource = { workspaceId: 'workspace-xyz', organizationId: 'org-abc' }
//       expect(() => aclService.canPerformActionByPermission(user, 'user:read', resource)).toThrow(AclForbiddenException)
//     })

//     it('should deny user without permission but with organizationId', () => {
//       const user = createUser({
//         organizations: [
//           {
//             organizationId: 'org-zxc',
//             workspaceId: 'workspace-xyz',
//             name: 'Org',
//             status: OrganizationStatusEnum.ACTIVE,
//             deletedAt: null,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           },
//         ],
//         roles: [],
//         permissions: [],
//       })
//       const resource = { workspaceId: 'workspace-xyz', organizationId: 'org-zxc' }
//       expect(() => aclService.canPerformActionByPermission(user, 'user:read', resource)).toThrow(AclForbiddenException)
//     })
//   })
// })
