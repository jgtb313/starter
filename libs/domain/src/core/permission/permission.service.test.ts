import { Test, type TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@starter/nestjs-error-handling'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryDatabaseModule, loadDatabase } from '@/adapters/database'
import { PermissionRepositoryModule } from '@/adapters/database/permission/permission.repository.module'
import { permissionMocks } from '@/core/permission/permission.mock'
import { PermissionService } from '@/core/permission/permission.service'

describe('PermissionService', () => {
	let service: PermissionService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				InMemoryDatabaseModule.register(),
				PermissionRepositoryModule,
			],
			providers: [
				PermissionService,
			],
		}).compile()

		service = module.get(PermissionService)

		await loadDatabase(module)

		vi.clearAllMocks()
	})

	it('should service be defined', () => {
		expect(service).toBeDefined()
	})

	describe('getPermissions', () => {
		it('should return permissions correctly', async () => {
			const result = await service.getPermissions()

			expect(result).toHaveLength(permissionMocks.length)
		})
	})

	describe('validatePermissionIds', () => {
		it('should resolve when all permissionIds are valid', async () => {
			const permission = permissionMocks[0]

			await expect(
				service.validatePermissionIds([
					permission.state.permissionId,
				]),
			).resolves.toBeUndefined()
		})

		it('should throw NotFoundException when some permissionIds are not valid', async () => {
			await expect(
				service.validatePermissionIds([
					'invalid-permission-id',
				]),
			).rejects.toThrow(NotFoundException)
		})
	})
})
