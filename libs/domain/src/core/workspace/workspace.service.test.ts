// import { Test, type TestingModule } from '@nestjs/testing'
// import {
// 	ConflictException,
// 	NotFoundException,
// } from '@starter/nestjs-error-handling'
// import { beforeEach, describe, expect, it, vi } from 'vitest'

// import { UserService } from '@/core/user/user.service'
// import { makeWorkspace, workspaceMocks } from '@/core/workspace/workspace.mock'
// import { WorkspaceService } from '@/core/workspace/workspace.service'
// import { InMemoryDatabaseModule } from '@/adapters/database'
// import { WorkspaceRepositoryModule } from '@/adapters/database/workspace/workspace.repository.module'
// import { PublisherModule } from '@/adapters/publisher/publisher.module'
// import { PublisherService } from '@/adapters/publisher/publisher.service'
// import { I18nDomainModule } from '@/domain.i18n.module'

// describe('WorkspaceService', () => {
// 	let service: WorkspaceService

// 	const userServiceMock = {
// 		getUser: vi.fn(),
// 		updateUser: vi.fn(),
// 	}

// 	const publisherServiceMock = {
// 		publish: vi.fn(),
// 	}

// 	beforeEach(async () => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			imports: [
// 				InMemoryDatabaseModule.register(),
// 				I18nDomainModule.register(),
// 				PublisherModule,
// 				WorkspaceRepositoryModule,
// 			],
// 			providers: [
// 				WorkspaceService,
// 				{
// 					provide: UserService,
// 					useValue: userServiceMock,
// 				},
// 				{
// 					provide: PublisherService,
// 					useValue: publisherServiceMock,
// 				},
// 			],
// 		}).compile()

// 		service = module.get(WorkspaceService)

// 		vi.clearAllMocks()
// 	})

// 	it('should service be defined', () => {
// 		expect(service).toBeDefined()
// 	})

// 	describe('getPaginatedWorkspaces', () => {
// 		it.each([
// 			{
// 				input: {
// 					offset: 0,
// 					limit: 10,
// 				},
// 				length: 5,
// 				total: 5,
// 			},
// 			{
// 				input: {
// 					offset: 0,
// 					limit: 1,
// 				},
// 				length: 1,
// 				total: 5,
// 			},
// 		])(
// 			'should return paginated workspaces correctly',
// 			async ({ input, length, total }) => {
// 				const result = await service.getPaginatedWorkspaces(input)

// 				expect(result.values).toHaveLength(length)
// 				expect(result.meta.total).toBe(total)
// 			},
// 		)
// 	})

// 	describe('getWorkspace', () => {
// 		it('should return the workspace if it exists', async () => {
// 			const [workspace] = workspaceMocks

// 			const result = await service.getWorkspace(workspace.workspaceId)

// 			expect(result.state.workspaceId).toBe(workspace.workspaceId)
// 		})

// 		it('should throw NotFoundException if workspace does not exist', async () => {
// 			await expect(service.getWorkspace('non-existent')).rejects.toThrow(
// 				new NotFoundException('Workspace non-existent not found'),
// 			)
// 		})
// 	})

// 	describe('createWorkspace', () => {
// 		it('should create and return a new workspace', async () => {
// 			const input = makeWorkspace({})

// 			userServiceMock.getUser.mockResolvedValueOnce({
// 				state: {
// 					userId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
// 				},
// 				assignToWorkspace(workspaceId: string) {
// 					this.state.workspaceId = workspaceId
// 				},
// 			})

// 			const result = await service.createWorkspace(
// 				'0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
// 				input,
// 			)

// 			expect(result.state.workspaceId).toBeDefined()
// 			expect(userServiceMock.updateUser).toHaveBeenCalledWith(
// 				'0e6c34bb-5a5c-4b31-bfec-33ec3651d581',
// 				expect.objectContaining({
// 					workspaceId: result.state.workspaceId,
// 				}),
// 			)
// 			expect(publisherServiceMock.publish).toHaveBeenCalledWith(
// 				'WORKSPACE_CREATED',
// 				expect.objectContaining({
// 					workspaceId: result.state.workspaceId,
// 				}),
// 			)
// 		})
// 	})

// 	describe('updateWorkspace', () => {
// 		it('should update workspace correctly', async () => {
// 			const [workspace] = workspaceMocks

// 			const result = await service.updateWorkspace(workspace.workspaceId, {
// 				name: 'Updated Workspace Name',
// 			})

// 			expect(result.state.name).toBe('Updated Workspace Name')
// 			expect(publisherServiceMock.publish).toHaveBeenCalledWith(
// 				'WORKSPACE_UPDATED',
// 				expect.objectContaining({
// 					workspaceId: result.state.workspaceId,
// 				}),
// 			)
// 		})

// 		it('should throw NotFoundException if workspace not found', async () => {
// 			await expect(
// 				service.updateWorkspace('non-existent', {
// 					name: 'X',
// 				}),
// 			).rejects.toThrow(
// 				new NotFoundException('Workspace non-existent not found'),
// 			)
// 		})
// 	})

// 	describe('activateWorkspace', () => {
// 		it('should mark workspace as active', async () => {
// 			const [workspace] = workspaceMocks.filter(
// 				(workspace) => workspace.status === 'INACTIVE',
// 			)

// 			const result = await service.activateWorkspace(workspace.workspaceId)

// 			expect(result.state.status).toBe('ACTIVE')
// 			expect(publisherServiceMock.publish).toHaveBeenCalledWith(
// 				'WORKSPACE_ACTIVATED',
// 				expect.objectContaining({
// 					workspaceId: result.state.workspaceId,
// 				}),
// 			)
// 		})

// 		it('should throw ConflictException if already active', async () => {
// 			const [workspace] = workspaceMocks.filter(
// 				(workspace) => workspace.status === 'ACTIVE',
// 			)

// 			await expect(
// 				service.activateWorkspace(workspace.workspaceId),
// 			).rejects.toThrow(
// 				new ConflictException('This workspace is already active.'),
// 			)
// 		})
// 	})

// 	describe('deactivateWorkspace', () => {
// 		it('should mark workspace as inactive', async () => {
// 			const [workspace] = workspaceMocks.filter(
// 				(workspace) => workspace.status === 'ACTIVE',
// 			)

// 			const result = await service.deactivateWorkspace(workspace.workspaceId)

// 			expect(result.state.status).toBe('INACTIVE')
// 			expect(publisherServiceMock.publish).toHaveBeenCalledWith(
// 				'WORKSPACE_DEACTIVATED',
// 				expect.objectContaining({
// 					workspaceId: result.state.workspaceId,
// 				}),
// 			)
// 		})

// 		it('should throw ConflictException if already inactive', async () => {
// 			const [workspace] = workspaceMocks.filter(
// 				(workspace) => workspace.status === 'INACTIVE',
// 			)

// 			await expect(
// 				service.deactivateWorkspace(workspace.workspaceId),
// 			).rejects.toThrow(
// 				new ConflictException('This workspace is already inactive.'),
// 			)
// 		})
// 	})
// })
