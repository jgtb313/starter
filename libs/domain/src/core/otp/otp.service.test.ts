import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { OTPService } from '@/core/otp/otp.service'
import { UserService } from '@/core/user/user.service'
import { OTPRepositoryModule } from '@/adapters/database/otp/otp.repository.module'
import { NotificationService } from '@/adapters/notification/notification.service'
import type { IOTPRepository } from '@/ports/database/otp/otp.repository.port'
import { DomainTestModule } from '@/domain.test.module'

const userServiceMock = {
	getUser: vi.fn(),
}

const notificationServiceMock = {
	send: vi.fn(),
}

describe('OTPService', () => {
	let service: OTPService
	let repository: IOTPRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
				OTPRepositoryModule,
			],
			providers: [
				OTPService,
				{
					provide: UserService,
					useValue: userServiceMock,
				},
				{
					provide: NotificationService,
					useValue: notificationServiceMock,
				},
			],
		}).compile()

		service = module.get(OTPService)
		repository = module.get<IOTPRepository>('OTP_REPOSITORY')

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
