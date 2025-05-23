import { Test, TestingModule } from '@nestjs/testing'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NotFoundException, AclForbiddenException } from '@starter/nestjs-error-handling'

import { OrganizationService } from '@/core/organization/organization.service'
import { OrganizationRepositoryModule } from '@/adapters/database/organization/organization.repository.module'
import { InMemoryDatabaseModule } from '@/adapters/database'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { IOrganizationRepository } from '@/ports/database/organization'
import { makeOrganization, organizationMocks } from '@/core/organization/organization.mock'
import { OrganizationStatusEnum } from '@/core/organization/organization.schema'

describe('OrganizationService', () => {
  let service: OrganizationService
  let repository: IOrganizationRepository

  const workspaceServiceMock = {
    getWorkspace: vi.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDatabaseModule.register(), OrganizationRepositoryModule],
      providers: [
        OrganizationService,
        {
          provide: WorkspaceService,
          useValue: workspaceServiceMock,
        },
      ],
    }).compile()

    service = module.get(OrganizationService)
    repository = module.get<IOrganizationRepository>('ORGANIZATION_REPOSITORY')

    for (const organization of organizationMocks) {
      await repository.create(organization.state)
    }

    vi.clearAllMocks()
  })

  it('should service be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getPaginatedOrganizations', () => {
    it.each([
      { input: { offset: 0, limit: 10 }, length: 7, total: 7 },
      { input: { offset: 0, limit: 2 }, length: 2, total: 7 },
    ])('should return paginated organizations correctly', async ({ input, length, total }) => {
      const result = await service.getPaginatedOrganizations(input)

      expect(result.values).toHaveLength(length)
      expect(result.meta.total).toBe(total)
    })
  })

  describe('getOrganization', () => {
    it('should return the organization if it exists and belongs to the workspace', async () => {
      const [organization] = organizationMocks

      const result = await service.getOrganization({
        organizationId: organization.state.organizationId,
        workspaceId: organization.state.workspaceId,
      })

      expect(result.state.organizationId).toBe(organization.state.organizationId)
    })

    it('should throw NotFoundException if organization does not exist', async () => {
      await expect(service.getOrganization({ organizationId: 'invalid-id', workspaceId: 'workspace-1' })).rejects.toThrow(
        new NotFoundException('Organization invalid-id not found'),
      )
    })

    it('should throw AclForbiddenException if workspaceId does not match', async () => {
      const [organization] = organizationMocks

      await expect(
        service.getOrganization({
          organizationId: organization.state.organizationId,
          workspaceId: 'invalid-workspace',
        }),
      ).rejects.toThrow(AclForbiddenException)
    })
  })

  describe('createOrganization', () => {
    it('should create and return a new organization', async () => {
      const workspaceId = '126b6b16-0238-41bc-9c27-54f260b08aaa'

      workspaceServiceMock.getWorkspace.mockResolvedValue({ workspaceId })

      const input = makeOrganization({ workspaceId }).state

      const result = await service.createOrganization(input)

      expect(result.state.organizationId).toBeDefined()
      expect(result.state.workspaceId).toBe(workspaceId)
    })

    it('should call getWorkspace with correct workspaceId', async () => {
      const workspaceId = '126b6b16-0238-41bc-9c27-54f260b08aaa'

      workspaceServiceMock.getWorkspace.mockResolvedValue({ workspaceId })

      const input = makeOrganization({ workspaceId }).state

      await service.createOrganization(input)

      expect(workspaceServiceMock.getWorkspace).toHaveBeenCalledWith(workspaceId)
    })
  })

  describe('updateOrganization', () => {
    it('should update an existing organization', async () => {
      const [organization] = organizationMocks

      const updated = await service.updateOrganization(
        {
          organizationId: organization.state.organizationId,
          workspaceId: organization.state.workspaceId,
        },
        { name: 'Updated Name' },
      )

      expect(updated.state.name).toBe('Updated Name')
    })

    it('should throw NotFoundException if organization does not exist', async () => {
      await expect(service.updateOrganization({ organizationId: 'invalid-id', workspaceId: 'workspace-1' }, { name: 'X' })).rejects.toThrow(
        new NotFoundException('Organization invalid-id not found'),
      )
    })
  })

  describe('activeOrganization', () => {
    it('should mark organization as active', async () => {
      const [organization] = organizationMocks.filter((organization) => organization.isInactive())

      const result = await service.activeOrganization(organization.state.organizationId)

      expect(result.state.status).toBe(OrganizationStatusEnum.ACTIVE)
    })
  })

  describe('inactiveOrganization', () => {
    it('should mark organization as inactive', async () => {
      const [organization] = organizationMocks.filter((organization) => organization.isActive())

      const result = await service.inactiveOrganization({
        organizationId: organization.state.organizationId,
        workspaceId: organization.state.workspaceId,
      })

      expect(result.state.status).toBe(OrganizationStatusEnum.INACTIVE)
    })
  })

  describe('deleteOrganization', () => {
    it('should delete the organization', async () => {
      const [organization] = organizationMocks

      await service.deleteOrganization({
        organizationId: organization.state.organizationId,
        workspaceId: organization.state.workspaceId,
      })

      await expect(
        service.getOrganization({
          organizationId: organization.state.organizationId,
          workspaceId: organization.state.workspaceId,
        }),
      ).rejects.toThrow(NotFoundException)
    })
  })

  describe('validateOrganizationIds', () => {
    it('should resolve when all IDs are valid', async () => {
      const organizationIds = organizationMocks
        .filter((organization) => !organization.state.deletedAt)
        .map((organization) => organization.state.organizationId)

      await expect(service.validateOrganizationIds(organizationIds)).resolves.toBeUndefined()
    })

    it('should throw NotFoundException when ID doesnt exists', async () => {
      const organizationIds = ['0e6c34bb-5a5c-4b31-bfec-33ec3651d57f']

      await expect(service.validateOrganizationIds(organizationIds)).rejects.toThrow(
        new NotFoundException('The following organizationIds were not found: 0e6c34bb-5a5c-4b31-bfec-33ec3651d57f'),
      )
    })
  })
})
