import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { OrganizationService } from '@/core/organization/organization.service'
import { PermissionService } from '@/core/permission/permission.service'
import type { PlanService } from '@/core/plan/plan.service'
import { RoleService } from '@/core/role/role.service'
import { RoleRepositoryModule } from '@/adapters/database/role/role.repository.module'
import type { IRoleRepository } from '@/ports/database/role'
import { DomainTestModule } from '@/domain.test.module'

const organizationServiceMock = {
	validateOrganizationIds: vi.fn(),
}

const permissionServiceMock = {
	validatePermissionIds: vi.fn(),
}

describe('RoleService', () => {
	let service: PlanService
	let repository: IRoleRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
				RoleRepositoryModule,
			],
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

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
