import { Test, type TestingModule } from '@nestjs/testing'
import {
	ConflictException,
	NotFoundException,
} from '@starter/nestjs-error-handling'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryDatabaseModule } from '@/adapters/database'
import { WorkspaceRepositoryModule } from '@/adapters/database/workspace/workspace.repository.module'
import type { User } from '@/core/user/user.schema'
import { UserService } from '@/core/user/user.service'
import { makeWorkspace, workspaceMocks } from '@/core/workspace/workspace.mock'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import type { IWorkspaceRepository } from '@/ports/database/workspace'

describe('WorkspaceService', () => {
	let service: WorkspaceService
	let repository: IWorkspaceRepository

	const userServiceMock = {
		updateUser: vi.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				InMemoryDatabaseModule.register(),
				WorkspaceRepositoryModule,
			],
			providers: [
				WorkspaceService,
				{
					provide: UserService,
					useValue: userServiceMock,
				},
			],
		}).compile()

		service = module.get(WorkspaceService)
		repository = module.get<IWorkspaceRepository>('WORKSPACE_REPOSITORY')

		for (const workspace of workspaceMocks) {
			await repository.create(workspace.state)
		}

		vi.clearAllMocks()
	})

	it('should service be defined', () => {
		expect(service).toBeDefined()
	})

	describe('getPaginatedWorkspaces', () => {
		it.each([
			{
				input: {
					offset: 0,
					limit: 10,
				},
				length: 5,
				total: 5,
			},
			{
				input: {
					offset: 0,
					limit: 1,
				},
				length: 1,
				total: 5,
			},
		])(
			'should return paginated workspaces correctly',
			async ({ input, length, total }) => {
				const result = await service.getPaginatedWorkspaces(input)

				expect(result.values).toHaveLength(length)
				expect(result.meta.total).toBe(total)
			},
		)
	})

	describe('getWorkspace', () => {
		it('should return the workspace if it exists', async () => {
			const [workspace] = workspaceMocks

			const result = await service.getWorkspace(workspace.state.workspaceId)

			expect(result.state.workspaceId).toBe(workspace.state.workspaceId)
		})

		it('should throw NotFoundException if workspace does not exist', async () => {
			await expect(service.getWorkspace('non-existent')).rejects.toThrow(
				new NotFoundException('Workspace non-existent not found'),
			)
		})
	})

	describe('createWorkspace', () => {
		it('should create and return a new workspace', async () => {
			const input = makeWorkspace({}).state

			const result = await service.createWorkspace(
				'0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
				input,
			)

			expect(result.state.workspaceId).toBeDefined()
			expect(userServiceMock.updateUser).toHaveBeenCalledWith(
				'0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
				{
					workspaceId: result.state.workspaceId,
				},
			)
		})

		it('should throw ConflictException if user already has workspace', async () => {
			const user = {
				userId: 'user-123',
				workspaceId: 'workspace-abc',
			} as User

			await expect(
				service.createWorkspace(
					'0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
					makeWorkspace({}).state,
				),
			).rejects.toThrow(new ConflictException('Workspace already exists.'))
		})
	})

	describe('updateWorkspace', () => {
		it('should update workspace correctly', async () => {
			const [workspace] = workspaceMocks

			const result = await service.updateWorkspace(
				workspace.state.workspaceId,
				{
					name: 'Updated Workspace Name',
				},
			)

			expect(result.state.name).toBe('Updated Workspace Name')
		})

		it('should throw NotFoundException if workspace not found', async () => {
			await expect(
				service.updateWorkspace('non-existent', {
					name: 'X',
				}),
			).rejects.toThrow(
				new NotFoundException('Workspace non-existent not found'),
			)
		})
	})

	describe('activeWorkspace', () => {
		it('should mark workspace as active', async () => {
			const [workspace] = workspaceMocks.filter((w) => w.isInactive())

			const result = await service.activeWorkspace(workspace.state.workspaceId)

			expect(result.state.status).toBe('ACTIVE')
		})

		it('should throw ConflictException if already active', async () => {
			const [workspace] = workspaceMocks.filter((w) => w.isActive())

			await expect(
				service.activeWorkspace(workspace.state.workspaceId),
			).rejects.toThrow(
				new ConflictException('This workspace is already active.'),
			)
		})
	})

	describe('inactiveWorkspace', () => {
		it('should mark workspace as inactive', async () => {
			const [workspace] = workspaceMocks.filter((w) => w.isActive())

			const result = await service.inactiveWorkspace(
				workspace.state.workspaceId,
			)

			expect(result.state.status).toBe('INACTIVE')
		})

		it('should throw ConflictException if already inactive', async () => {
			const [workspace] = workspaceMocks.filter((w) => w.isInactive())

			await expect(
				service.inactiveWorkspace(workspace.state.workspaceId),
			).rejects.toThrow(
				new ConflictException('This workspace is already inactive.'),
			)
		})
	})
})
