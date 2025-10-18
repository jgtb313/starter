import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { NotificationService } from './notification.service'
import {
	EmailStrategy,
	MobilePushStrategy,
	SMSStrategy,
	WebPushStrategy,
	WhatsappStrategy,
} from './strategies'

describe('NotificationService', () => {
	let notificationService: NotificationService

	const mockEmailStrategy = {
		send: vi.fn(),
	}
	const mockSMSStrategy = {
		send: vi.fn(),
	}
	const mockWhatsappStrategy = {
		send: vi.fn(),
	}
	const mockWebPushStrategy = {
		send: vi.fn(),
	}
	const mockMobilePushStrategy = {
		send: vi.fn(),
	}

	beforeEach(async () => {
		vi.clearAllMocks()

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				NotificationService,
				{
					provide: EmailStrategy,
					useValue: mockEmailStrategy,
				},
				{
					provide: SMSStrategy,
					useValue: mockSMSStrategy,
				},
				{
					provide: WhatsappStrategy,
					useValue: mockWhatsappStrategy,
				},
				{
					provide: WebPushStrategy,
					useValue: mockWebPushStrategy,
				},
				{
					provide: MobilePushStrategy,
					useValue: mockMobilePushStrategy,
				},
			],
		}).compile()

		notificationService = module.get(NotificationService)
	})

	it('should be defined', () => {
		expect(notificationService).toBeDefined()
	})
})
