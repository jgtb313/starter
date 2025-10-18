import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { OTPService } from '@/core/otp/otp.service'
import { UserService } from '@/core/user/user.service'
import { NotificationService } from '@/adapters/notification/notification.service'
import type { IOTPRepository } from '@/ports/database/otp/otp.repository.port'
import { DomainTestModule } from '@/domain.test.module'

const userServiceMock = {
	getUser: vi.fn(),
}

const notificationServiceMock = {
	send: vi.fn(),
}

const mockOTPRepository: Mocked<IOTPRepository> = {
	findById: vi.fn(),
	findMostRecent: vi.fn(),
	countTodayAttempts: vi.fn(),
	create: vi.fn(),
	updateById: vi.fn(),
}

describe('OTPService', () => {
	let service: OTPService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				DomainTestModule.register(),
			],
			providers: [
				OTPService,
				{
					provide: 'OTP_REPOSITORY',
					useValue: mockOTPRepository,
				},
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

		vi.clearAllMocks()
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
