import { Test, TestingModule } from '@nestjs/testing'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NotFoundException, AclForbiddenException } from '@starter/nestjs-error-handling'

import { RoleService } from '@/core/role/role.service'
import { OrganizationService } from '@/core/organization/organization.service'
import { PermissionService } from '@/core/permission/permission.service'
import { RoleRepositoryModule } from '@/adapters/database/role/role.repository.module'
import { InMemoryDatabaseModule } from '@/adapters/database'
import { IRoleRepository } from '@/ports/database/role'
import { makeRole, roleMocks } from '@/core/role/role.mock'
import { RoleStatusEnum } from '@/core/role/role.schema'

describe.only('RoleService', () => {
  let service: RoleService
  let repository: IRoleRepository

  const organizationServiceMock = {
    validateOrganizationIds: vi.fn(),
  }

  const permissionServiceMock = {
    validatePermissionIds: vi.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDatabaseModule.register(), RoleRepositoryModule],
      providers: [
        RoleService,
        {
          provide: OrganizationService,
          useValue: organizationServiceMock,
        },
        {
          provide: PermissionService,
          useValue: permissionServiceMock,
        },
      ],
    }).compile()

    service = module.get(RoleService)
    repository = module.get<IRoleRepository>('ROLE_REPOSITORY')

    // Limpar db se necessário (depende do módulo, coloque se precisar)
    // await repository.clear()

    for (const role of roleMocks) {
      const { organizations, permissions, ...state } = role.state
      await repository.create({
        ...state,
        organizationIds: organizations.map((o) => o.organizationId),
        permissionIds: permissions.map((p) => p.permissionId),
      })
    }

    vi.clearAllMocks()
  })

  it('should service be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getPaginatedRoles', () => {
    it.each([
      { input: { offset: 0, limit: 10 }, length: 10, total: 10 },
      { input: { offset: 0, limit: 2 }, length: 2, total: 10 },
    ])('should return paginated roles correctly', async ({ input, length, total }) => {
      const result = await service.getPaginatedRoles(input)

      expect(result.values).toHaveLength(length)
      expect(result.meta.total).toBe(total)
    })
  })

  describe('getRole', () => {
    it('should return the role if it exists and belongs to the workspace', async () => {
      const role = roleMocks[0]
      const reference = { roleId: role.state.roleId, workspaceId: role.state.workspaceId }

      const result = await service.getRole(reference)

      expect(result.state.roleId).toBe(role.state.roleId)
    })

    it('should throw NotFoundException if role does not exist', async () => {
      await expect(service.getRole({ roleId: 'invalid-id', workspaceId: 'any-workspace' })).rejects.toThrow(
        new NotFoundException('Role invalid-id not found'),
      )
    })

    it('should throw AclForbiddenException if workspaceId does not match', async () => {
      const role = roleMocks[0]
      const wrongWorkspaceId = 'some-other-workspace-id'

      await expect(service.getRole({ roleId: role.state.roleId, workspaceId: wrongWorkspaceId })).rejects.toThrow(AclForbiddenException)
    })
  })

  describe('createRole', () => {
    it('should create and return a new role', async () => {
      const input = makeRole({}).state
      const organizationIds = ['org-1', 'org-2', 'org-3']
      const permissionIds = ['perm-1', 'perm-2', 'perm-3']

      const result = await service.createRole({ ...input, organizationIds, permissionIds })

      expect(organizationServiceMock.validateOrganizationIds).toHaveBeenCalledWith(organizationIds)
      expect(permissionServiceMock.validatePermissionIds).toHaveBeenCalledWith(permissionIds)
      expect(result.state.roleId).toBeDefined()
      expect(result.state.status).toBe(RoleStatusEnum.ACTIVE)
    })
  })

  describe('updateRole', () => {
    it('should update an existing role', async () => {
      const role = roleMocks[0]
      const reference = { roleId: role.state.roleId, workspaceId: role.state.workspaceId }
      const updated = await service.updateRole(reference, { name: 'Updated Name' })

      expect(updated.state.name).toBe('Updated Name')
    })

    it('should throw NotFoundException if role does not exist', async () => {
      await expect(service.updateRole({ roleId: 'invalid-id', workspaceId: 'any-workspace' }, { name: 'Updated Name' })).rejects.toThrow(
        new NotFoundException('Role invalid-id not found'),
      )
    })
  })

  describe('activeRole', () => {
    it('should mark role as active', async () => {
      const role = roleMocks.find((r) => r.state.status === RoleStatusEnum.INACTIVE)!
      const reference = { roleId: role.state.roleId, workspaceId: role.state.workspaceId }

      const result = await service.activeRole(reference)

      expect(result.state.status).toBe(RoleStatusEnum.ACTIVE)
    })
  })

  describe('inactiveRole', () => {
    it('should mark role as inactive', async () => {
      const role = roleMocks.find((r) => r.state.status === RoleStatusEnum.ACTIVE)!
      const reference = { roleId: role.state.roleId, workspaceId: role.state.workspaceId }

      const result = await service.inactiveRole(reference)

      expect(result.state.status).toBe(RoleStatusEnum.INACTIVE)
    })
  })

  describe('deleteRole', () => {
    it('should delete the role', async () => {
      const role = roleMocks[0]
      const reference = { roleId: role.state.roleId, workspaceId: role.state.workspaceId }

      await expect(service.deleteRole(reference)).resolves.toBeUndefined()

      // Optional: Check role is really deleted
      await expect(service.getRole(reference)).rejects.toThrow(NotFoundException)
    })
  })

  describe('validateRoleIdsByOrganizationId', () => {
    it('should resolve when all roleIds are valid for the organization', async () => {
      const role = roleMocks[0]
      const organizationId = role.state.organizations[0].organizationId

      await expect(service.validateRoleIdsByOrganizationId(organizationId, [role.state.roleId])).resolves.toBeUndefined()
    })

    it('should throw NotFoundException when some roleIds are not valid for the organization', async () => {
      const role = roleMocks[0]
      const organizationId = role.state.organizations[0].organizationId

      await expect(service.validateRoleIdsByOrganizationId(organizationId, ['invalid-role-id'])).rejects.toThrow(NotFoundException)
    })
  })
})
