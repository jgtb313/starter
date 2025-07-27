import { Test, TestingModule } from '@nestjs/testing'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NotFoundException, AclForbiddenException } from '@starter/nestjs-error-handling'

import { RoleService } from '@/core/role/role.service'
import { OrganizationService } from '@/core/organization/organization.service'
import { RoleRepositoryModule } from '@/adapters/database/role/role.repository.module'
import { InMemoryDatabaseModule } from '@/adapters/database'
import { IRoleRepository } from '@/ports/database/role'
import { makeRole, roleMocks } from '@/core/role/role.mock'
import { RoleStatusEnum } from '@/core/role/role.schema'

describe('RoleService', () => {
  let service: RoleService
  let repository: IRoleRepository

  const organizationServiceMock = {
    validateOrganizationIds: vi.fn(),
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
      ],
    }).compile()

    service = module.get(RoleService)
    repository = module.get<IRoleRepository>('ROLE_REPOSITORY')

    for (const role of roleMocks) {
      const { ...state } = role.state
      await repository.create(state)
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
      const [role] = roleMocks

      const result = await service.getRole(role.state.roleId)

      expect(result.state.roleId).toBe(role.state.roleId)
    })

    it('should throw NotFoundException if role does not exist', async () => {
      await expect(service.getRole('invalid-id')).rejects.toThrow(new NotFoundException('Role invalid-id not found'))
    })

    it('should throw AclForbiddenException if workspaceId does not match', async () => {
      const [role] = roleMocks

      await expect(service.getRole(role.state.roleId)).rejects.toThrow(AclForbiddenException)
    })
  })

  describe('createRole', () => {
    it('should create and return a new role', async () => {
      const input = makeRole({}).state
      const organizationIds: string[] = ['organization-1', 'organization-2', 'organization-3']
      const permissions: string[] = ['permission-1', 'permission-2', 'permission-3']

      const result = await service.createRole({ ...input, organizationIds, permissions })

      expect(organizationServiceMock.validateOrganizationIds).toHaveBeenCalledWith(organizationIds)
      expect(result.state.roleId).toBeDefined()
    })

    it('should call validateOrganizationIds with correct ids', async () => {
      const input = makeRole({}).state
      const organizationIds: string[] = ['organization-1', 'organization-2', 'organization-3']
      const permissions: string[] = ['permission-1', 'permission-2', 'permission-3']

      await service.createRole({ ...input, organizationIds, permissions })

      expect(organizationServiceMock.validateOrganizationIds).toHaveBeenCalledWith(organizationIds)
    })
  })

  describe('updateRole', () => {
    it('should update an existing role', async () => {
      const [role] = roleMocks

      const updated = await service.updateRole(role.state.roleId, { name: 'Updated Name' })

      expect(updated.state.name).toBe('Updated Name')
    })

    it('should throw NotFoundException if role does not exist', async () => {
      await expect(service.updateRole('invalid-id', { name: 'Updated Name' })).rejects.toThrow(new NotFoundException('Role invalid-id not found'))
    })
  })

  describe('activeRole', () => {
    it('should mark role as active', async () => {
      const [role] = roleMocks.filter((role) => role.isInactive())

      const result = await service.activeRole(role.state.roleId)

      expect(result.state.status).toBe(RoleStatusEnum.ACTIVE)
    })
  })

  describe('inactiveRole', () => {
    it('should mark role as inactive', async () => {
      const [role] = roleMocks.filter((role) => role.isActive())

      const result = await service.inactiveRole(role.state.roleId)

      expect(result.state.status).toBe(RoleStatusEnum.INACTIVE)
    })
  })

  describe('deleteRole', () => {
    it('should delete the role', async () => {
      const [role] = roleMocks

      await expect(service.deleteRole(role.state.roleId)).resolves.toBeUndefined()
    })
  })

  describe('validateRoleIdsByOrganizationId', () => {
    it('should resolve when all roleIds are valid for the organization', async () => {
      const [role] = roleMocks

      await expect(service.validateRoleIdsByOrganizationId(role.state.workspaceId, [role.state.roleId])).resolves.toBeUndefined()
    })

    it('should throw NotFoundException when some roleIds are not valid for the organization', async () => {
      const [role] = roleMocks

      await expect(service.validateRoleIdsByOrganizationId(role.state.workspaceId, ['invalid-role-id'])).rejects.toThrow(
        new NotFoundException(`The following roleIds were not found for organizationId ${role.state.workspaceId}: invalid-role-id`),
      )
    })
  })
})
