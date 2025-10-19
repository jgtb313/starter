import { Inject, Injectable } from '@nestjs/common'

import type { Profile } from '@/core/profile/profile.schema'
import { ProfileSchema } from '@/core/profile/profile.schema'
import type { IUserRepository } from '@/ports/database/user'

@Injectable()
export class ProfileService {
	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
	) {}

	async getProfile(userId: string): Promise<Profile> {
		const user = await this.userRepository.findById(userId)
		const permissions = await this.userRepository.findPermissions(userId)

		const scopes: Profile['scopes'] = permissions.reduce<Profile['scopes']>(
			(result, { permissionId, organizationId }) => {
				const kind: Profile['scopes'][number]['kind'] = organizationId
					? 'ORGANIZATION'
					: 'WORKSPACE'

				const existing = result.find((scope) =>
					kind === 'WORKSPACE'
						? scope.kind === 'WORKSPACE'
						: scope.kind === 'ORGANIZATION' &&
							scope.organizationId === organizationId,
				)

				if (existing) {
					if (!existing.permissions.includes(permissionId)) {
						existing.permissions.push(permissionId)
					}
				} else {
					result.push(
						kind === 'WORKSPACE'
							? {
									kind,
									permissions: [
										permissionId,
									],
								}
							: {
									kind,
									organizationId: organizationId!,
									permissions: [
										permissionId,
									],
								},
					)
				}

				return result
			},
			[],
		)

		return ProfileSchema.parse({
			...user.toJSON(),
			scopes,
		})
	}
}
