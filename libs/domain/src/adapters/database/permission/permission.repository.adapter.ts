import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, type Repository } from 'typeorm'

import { deepMapDatesToISOString } from '@/support/utilities'
import { PermissionDomain } from '@/core/permission/permission.domain'
import { PermissionEntity } from '@/adapters/database/permission/permission.typeorm.entity'
import type { IPermissionRepository } from '@/ports/database/permission'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class PermissionTypeorm implements IPermissionRepository {
	constructor(
		@InjectRepository(PermissionEntity)
		private readonly repository: Repository<PermissionEntity>,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	find: IPermissionRepository['find'] = async () => {
		const values = await this.repository.find()

		return values.map(this.toPermissionDomain)
	}

	validateIds: IPermissionRepository['validateIds'] = async (permissionIds) => {
		const values = await this.repository.find({
			where: {
				permissionId: In(permissionIds),
			},
		})

		const missingPermissionIds = permissionIds.filter(
			(permissionId) =>
				!values.some((value) => value.permissionId === permissionId),
		)

		if (missingPermissionIds.length) {
			throw new NotFoundException(
				this.i18nService.current.permissionIdsNotFound({
					permissionIds: missingPermissionIds,
				}),
			)
		}
	}

	private toPermissionDomain = (
		permission: PermissionEntity,
	): PermissionDomain => {
		return new PermissionDomain(
			deepMapDatesToISOString(permission),
			this.i18nService,
		)
	}
}
