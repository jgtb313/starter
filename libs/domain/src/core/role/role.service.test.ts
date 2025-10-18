import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { OrganizationService } from '@/core/organization/organization.service'
import { PermissionService } from '@/core/permission/permission.service'
import { RoleService } from '@/core/role/role.service'
import type { IRoleRepository } from '@/ports/database/role'
import { DomainTestModule } from '@/domain.test.module'

const organizationServiceMock = {
	validateOrganizationIds: vi.fn(),
}

const permissionServiceMock = {
	validatePermissionIds: vi.fn(),
}

const mockRoleRepository: Mocked<IRoleRepository> = {
	findPaginated: vi.fn(),
	find: vi.fn(),
	findById: vi.fn(),
	create: vi.fn(),
	updateById: vi.fn(),
	deleteById: vi.fn(),
	validateIds: vi.fn(),
	validateIdsByOrganizationId: vi.fn(),
}

describe('RoleService', () => {
	let service: RoleService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
			],
			providers: [
				RoleService,
				{
					provide: 'ROLE_REPOSITORY',
					useValue: mockRoleRepository,
				},
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

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
