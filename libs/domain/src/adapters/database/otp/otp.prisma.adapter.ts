import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { deepMapDatesToISOString } from '@/support/utilities'
import { OTPDomain } from '@/core/otp/otp.domain'
import { type Prisma, prisma } from '@/adapters/database/database.prisma.client'
import type { IOTPRepository } from '@/ports/database/otp'
import { type I18nDomainService, I18nDomainSymbol } from '@/domain.i18n.module'

@Injectable()
export class OTPPrisma implements IOTPRepository {
	constructor(
		@Inject(I18nDomainSymbol)
		private readonly i18nService: I18nDomainService,
	) {}

	findById: IOTPRepository['findById'] = async (otpId) => {
		const otp = await prisma.oTP.findUnique({
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
		const otp = await prisma.oTP.findFirst({
			where: {
				recipient,
				context,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return otp ? this.toOTPDomain(otp) : null
	}

	countTodayAttempts: IOTPRepository['countTodayAttempts'] = async (
		recipient,
		context,
	) => {
		const today = new Date()
		today.setHours(0, 0, 0, 0)

		return prisma.oTP.count({
			where: {
				recipient,
				context,
				createdAt: {
					gte: today,
				},
			},
		})
	}

	create: IOTPRepository['create'] = async (input) => {
		const otp = await prisma.oTP.create({
			data: input,
		})

		return this.toOTPDomain(otp)
	}

	updateById: IOTPRepository['updateById'] = async (otpId, input) => {
		const otp = await prisma.oTP.update({
			where: {
				otpId,
			},
			data: input,
		})

		return this.toOTPDomain(otp)
	}

	private toOTPDomain(model: Prisma.OTPGetPayload<{}>) {
		return new OTPDomain(deepMapDatesToISOString(model), this.i18nService)
	}
}
