import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { DeepPartial, Repository } from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { deepMapDatesToISOString } from '@/support/utilities'
import { OTPDomain } from '@/core/otp/otp.domain'
import type { BaseOTP, OTP } from '@/core/otp/otp.schema'
import { OTPEntity } from '@/adapters/database/otp/otp.typeorm.entity'
import type { IOTPRepository } from '@/ports/database/otp'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class OTPTypeorm implements IOTPRepository {
	constructor(
		@InjectRepository(OTPEntity)
		private readonly repository: Repository<OTPEntity>,
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findById: IOTPRepository['findById'] = async (otpId) => {
		const otp = await this.repository.findOne({
			where: {
				otpId,
			},
		})

		if (!otp) {
			throw new NotFoundException(
				this.i18nService.current.otpNotFound({
					otpId,
				}),
			)
		}

		return this.toOTPDomain(otp)
	}

	findMostRecent: IOTPRepository['findMostRecent'] = async (
		recipient,
		context,
	) => {
		const otp = await this.repository.findOne({
			where: {
				recipient,
				context,
			},
			order: {
				createdAt: 'DESC',
			},
		})

		if (!otp) {
			return null
		}

		return this.toOTPDomain(otp)
	}

	countTodayAttempts: IOTPRepository['countTodayAttempts'] = async (
		recipient,
		context,
	) => {
		return this.repository.count({
			where: {
				recipient,
				context,
			},
		})
	}

	create: IOTPRepository['create'] = async (input) => {
		const data = this.repository.create(input)

		const otp = await this.repository.save(data)

		return this.toOTPDomain(otp)
	}

	updateById: IOTPRepository['updateById'] = async (otpId, input) => {
		const otp = await this.findById(otpId)

		await this.repository.update(otp.state.otpId, input)

		return this.findById(otp.state.otpId)
	}

	private toOTPDomain = (model: OTPEntity) => {
		return new OTPDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
