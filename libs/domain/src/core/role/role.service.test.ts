import { Test, TestingModule } from '@nestjs/testing'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AclForbiddenException, NotFoundException } from '@starter/nestjs-error-handling'

import { InMemoryDatabaseModule, loadDatabase } from '@/adapters/database'
import { RoleRepositoryModule } from '@/adapters/database/role/role.repository.module'
import { RoleService } from '@/core/role/role.service'
import { RoleStatusEnum } from '@/core/role/role.schema'
import { makeRole, roleMocks } from '@/core/role/role.mock'
import { OrganizationService } from '@/core/organization/organization.service'
import { organizationMocks } from '@/core/organization/organization.mock'
import { PermissionService } from '@/core/permission/permission.service'
import { permissionMocks } from '@/core/permission/permission.mock'

describe('RoleService', async () => {
  let service: RoleService

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

    await loadDatabase(module)

    service = module.get(RoleService)
  })

  it('should service be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getPaginatedRoles', () => {
    it.each([
      // Pagination
      { input: { offset: 0, limit: 10 }, length: 10, total: 10, desc: 'full pagination' },
      { input: { offset: 0, limit: 2 }, length: 2, total: 10, desc: 'pagination with 2 items' },
      { input: { offset: 2, limit: 5 }, length: 5, total: 10, desc: 'pagination with offset' },

      // // Filters
      { input: { workspaceId: roleMocks[0].state.workspaceId }, length: 1, total: 1, desc: 'filter by workspaceId' },
      { input: { name: 'Admin' }, length: 1, total: 1, desc: 'filter by exact name' },
      {
        input: { status: RoleStatusEnum.ACTIVE },
        length: 5,
        total: 5,
        desc: 'filter by status',
      },
      {
        input: { organizationIds: [organizationMocks[0].state.organizationId] },
        length: 2,
        total: 2,
        desc: 'filter by organizationId',
      },
      {
        input: { permissionIds: [roleMocks[0].state.permissions[0].permissionId] },
        length: 3,
        total: 3,
        desc: 'filter by permissionId',
      },

      // Sorting
      {
        input: { sort: { name: 'ASC' as const } },
        expectedIds: [
          roleMocks.find((role) => role.state.name === 'Admin')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Analyst')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Contributor')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Developer')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Editor')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'HR')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Moderator')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Operator')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Support')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Viewer')!.state.roleId,
        ],
        length: 10,
        total: 10,
        desc: 'sort by name ASC',
      },
      {
        input: { sort: { name: 'DESC' as const } },
        expectedIds: [
          roleMocks.find((role) => role.state.name === 'Viewer')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Support')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Operator')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Moderator')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'HR')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Editor')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Developer')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Contributor')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Analyst')!.state.roleId,
          roleMocks.find((role) => role.state.name === 'Admin')!.state.roleId,
        ],
        length: 10,
        total: 10,
        desc: 'sort by name DESC',
      },

      // Filters + Sorting
      {
        input: {
          workspaceId: roleMocks[0].state.workspaceId,
          name: 'Admin',
          status: RoleStatusEnum.ACTIVE,
          organizationIds: [roleMocks[0].state.organizations[0].organizationId],
          permissionIds: [roleMocks[0].state.permissions[0].permissionId],
          sort: { name: 'ASC' as const },
        },
        expectedIds: [roleMocks[0].state.roleId],
        length: 1,
        total: 1,
        desc: 'all filters applied with sorting by name ASC',
      },
    ])('should return roles correctly for $desc', async ({ input, expectedIds, length, total }) => {
      const result = await service.getPaginatedRoles(input)

      expect(result.values).toHaveLength(length)
      expect(result.meta.total).toBe(total)

      if (expectedIds?.length) {
        expect(result.values.map((role) => role.state.roleId)).toEqual(expectedIds)
      }
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
      const organizationIds = [
        organizationMocks[0].state.organizationId,
        organizationMocks[1].state.organizationId,
        organizationMocks[2].state.organizationId,
      ]
      const permissionIds = [permissionMocks[0].state.permissionId, permissionMocks[1].state.permissionId, permissionMocks[2].state.permissionId]

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
      const updated = await service.updateRole({ roleId: role.state.roleId, workspaceId: role.state.workspaceId }, { name: 'Updated Name' })

      expect(updated.state.name).toBe('Updated Name')
    })

    it('should update an existing role with new organizationIds and permissionIds', async () => {
      const role = roleMocks[0]
      const organizationIds = [organizationMocks[0].state.organizationId, organizationMocks[1].state.organizationId]
      const permissionIds = [permissionMocks[0].state.permissionId, permissionMocks[1].state.permissionId]

      const updated = await service.updateRole(
        { roleId: role.state.roleId, workspaceId: role.state.workspaceId },
        { name: 'My Test Role', organizationIds, permissionIds },
      )

      // expect(updated.state.organizations).toHaveLength(organizationIds.length)
      expect(updated.state.permissions).toHaveLength(permissionIds.length)
    })

    it('should throw NotFoundException if role does not exist', async () => {
      await expect(service.updateRole({ roleId: 'invalid-id', workspaceId: 'any-workspace' }, { name: 'Updated Name' })).rejects.toThrow(
        new NotFoundException('Role invalid-id not found'),
      )
    })
  })

  describe('activeRole', () => {
    it('should mark role as active', async () => {
      const role = roleMocks.find((role) => role.state.status === RoleStatusEnum.INACTIVE)!

      const result = await service.activeRole({ roleId: role.state.roleId, workspaceId: role.state.workspaceId })

      expect(result.state.status).toBe(RoleStatusEnum.ACTIVE)
    })
  })

  describe('inactiveRole', () => {
    it('should mark role as inactive', async () => {
      const role = roleMocks.find((role) => role.state.status === RoleStatusEnum.ACTIVE)!

      const result = await service.inactiveRole({ roleId: role.state.roleId, workspaceId: role.state.workspaceId })

      expect(result.state.status).toBe(RoleStatusEnum.INACTIVE)
    })
  })

  describe('deleteRole', () => {
    it('should delete the role', async () => {
      const role = roleMocks[0]

      await expect(service.deleteRole({ roleId: role.state.roleId, workspaceId: role.state.workspaceId })).resolves.toBeUndefined()
      await expect(service.getRole({ roleId: role.state.roleId, workspaceId: role.state.workspaceId })).rejects.toThrow(NotFoundException)
    })
  })

  describe('validateRoleIds', () => {
    it('should resolve when all roleIds are valid', async () => {
      const [role] = roleMocks

      await expect(service.validateRoleIds([role.state.roleId])).resolves.toBeUndefined()
    })

    it('should throw NotFoundException when some roleIds are not valid', async () => {
      await expect(service.validateRoleIds(['invalid-role-id'])).rejects.toThrow(NotFoundException)
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
