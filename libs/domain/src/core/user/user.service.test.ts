import { Test, type TestingModule } from '@nestjs/testing'
import {
	AclForbiddenException,
	BadRequestException,
	ConflictException,
} from '@starter/nestjs-error-handling'
import { Phone } from '@starter/schema'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { RoleService } from '@/core/role/role.service'
import { makeUser, userMocks } from '@/core/user/user.mock'
import { UserService } from '@/core/user/user.service'
import { makeWorkspace } from '@/core/workspace/workspace.mock'
import { WorkspaceService } from '@/core/workspace/workspace.service'
import { InMemoryDatabaseModule } from '@/adapters/database'
import { UserRepositoryModule } from '@/adapters/database/user/user.repository.module'
import { EncryptModule } from '@/adapters/encrypt'
import type { IUserRepository } from '@/ports/database/user'

const workspaceServiceMock = {
	getWorkspace: vi.fn(),
}

const roleServiceMock = {
	validateRoleIdsByOrganizationId: vi.fn(),
}

describe('UserService', () => {
	let service: UserService
	let repository: IUserRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				InMemoryDatabaseModule.register(),
				UserRepositoryModule,
			],
			providers: [
				UserService,
				EncryptModule,
				{
					provide: WorkspaceService,
					useValue: workspaceServiceMock,
				},
				{
					provide: RoleService,
					useValue: roleServiceMock,
				},
			],
		}).compile()

		service = module.get(UserService)
		repository = module.get<IUserRepository>('USER_REPOSITORY')

		for (const user of userMocks) {
			await repository.create(user.state)
		}

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	// describe('getPaginatedUsers', () => {
	//   it.each([
	//     { input: { offset: 0, limit: 10 }, length: 10, total: 10 },
	//     { input: { offset: 0, limit: 2 }, length: 2, total: 10 },
	//   ])('should return paginated users correctly', async ({ input, length, total }) => {
	//     const result = await service.getPaginatedUsers(input)

	//     expect(result.values).toHaveLength(length)
	//     expect(result.meta.total).toBe(total)
	//   })
	// })

	describe('getUser', () => {
		it('should return user if belongs to workspace', async () => {
			const [user] = userMocks
			const result = await service.getUser({
				userId: user.state.userId,
				workspaceId: `${user.state.workspaceId}`,
			})
			expect(result.userId).toBe(user.state.userId)
		})

		it('should throw AclForbiddenException if workspaceId mismatches', async () => {
			const [user] = userMocks
			await expect(
				service.getUser({
					userId: user.state.userId,
					workspaceId: 'wrong-id',
				}),
			).rejects.toThrow(AclForbiddenException)
		})
	})

	// describe('getUserByEmail', () => {
	//   it('returns the user matching the given email', async () => {
	//     const [user] = userMocks
	//     const result = await service.getUserByEmail(user.state.email)
	//     expect(result?.state.email).toBe(user.state.email)
	//   })

	//   it('returns undefined when no user matches the given email', async () => {
	//     const result = await service.getUserByEmail('non-existing-email')
	//     expect(result).toBe(undefined)
	//   })
	// })

	// describe('getUserByEmail', () => {
	//   it('returns the user matching the given email', async () => {
	//     const [user] = userMocks
	//     const result = await service.getUserByEmail(user.state.email)
	//     expect(result?.state.userId).toBe(user.state.userId)
	//   })

	//   it('returns undefined when no user matches the given email', async () => {
	//     const result = await service.getUserByEmail('non-existing-email')
	//     expect(result).toBe(undefined)
	//   })
	// })

	// describe('getUserByPhone', () => {
	//   it('returns the user matching the given phone', async () => {
	//     const [user] = userMocks.filter((user) => user.state.phone)
	//     const result = await service.getUserByPhone(user.state.phone as Phone)
	//     expect(result?.state.userId).toBe(user.state.userId)
	//   })

	//   it('returns undefined when no user matches the given phone', async () => {
	//     const result = await service.getUserByPhone({
	//       iso: 'BR',
	//       ddi: '+55',
	//       number: '111111111111',
	//     })
	//     expect(result).toBe(undefined)
	//   })
	// })

	// describe('getUserByPhone', () => {
	//   it('should return user by phone', async () => {
	//     const [user] = userMocks
	//     const result = await service.getUserByPhone(user.state.phone)
	//     expect(result?.state.userId).toBe(user.state.userId)
	//   })
	// })

	// describe('getUserBySocial', () => {
	//   it('should return user by social provider', async () => {
	//     const [user] = userMocks
	//     const result = await service.getUserBySocial('GOOGLE', user.state.providerToken!, user.state.email)
	//     expect(result?.state.userId).toBe(user.state.userId)
	//   })
	// })

	// describe('createUser', () => {
	//   it('should create a new user', async () => {
	//     const workspace = makeWorkspace({})
	//     workspaceServiceMock.getWorkspace.mockResolvedValue(workspace)

	//     const input = makeUser({ workspaceId: workspace.state.workspaceId }).state

	//     const user = await service.createUser(input)
	//     expect(user.state.email).toBe(input.email)
	//   })

	//   it('should throw ConflictException if email exists', async () => {
	//     const [user] = userMocks
	//     await expect(service.createUser(user.state)).rejects.toThrow(ConflictException)
	//   })
	// })

	// describe('updateUser', () => {
	//   it('should update user data', async () => {
	//     const [user] = userMocks
	//     const updated = await service.updateUser({ userId: user.state.userId, workspaceId: user.state.workspaceId }, { name: 'Updated' })
	//     expect(updated.state.name).toBe('Updated')
	//   })
	// })

	// describe('updateUserPassword', () => {
	//   it('should update the user password', async () => {
	//     const [user] = userMocks
	//     await service.updateUserPassword(user.state.userId, 'new-password')
	//     const updated = await repository.findById(user.state.userId)
	//     expect(updated?.state.password).toBe('hashed-new-password')
	//   })
	// })

	// describe('deleteUser', () => {
	//   it('should soft delete user', async () => {
	//     const [user] = userMocks
	//     await service.deleteUser({ userId: user.state.userId, workspaceId: user.state.workspaceId })
	//     const result = await repository.findById(user.state.userId)
	//     expect(result?.state.deletedAt).toBeDefined()
	//   })
	// })

	// describe('verifyUserPassword', () => {
	//   it('should pass if password matches', async () => {
	//     const [user] = userMocks
	//     await service.verifyUserPassword(user.state.userId, user.state.password.replace('hashed-', ''))
	//   })

	//   it('should throw BadRequestException if password does not match', async () => {
	//     const [user] = userMocks
	//     await expect(service.verifyUserPassword(user.state.userId, 'wrong-password')).rejects.toThrow(BadRequestException)
	//   })
	// })
})
