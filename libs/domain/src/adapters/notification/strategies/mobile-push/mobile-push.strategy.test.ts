import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import type { INotificationStrategy } from '@/ports/notification'

import { MobilePushStrategy } from './mobile-push.strategy'
import * as templates from './mobile-push.templates'

vi.mock('./mobile-push.templates', () => ({
	templates: {
		HELLO: vi.fn((props) => `Hello, ${props.userName}`),
	},
}))

describe('MobilePushStrategy', () => {
	let mobilePushService: MobilePushStrategy

	const mobilePushMock = {
		send: vi.fn(),
	} as Mocked<INotificationStrategy<'MOBILE_PUSH'>>

	beforeEach(async () => {
		vi.clearAllMocks()

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MobilePushStrategy,
				{
					provide: 'MobilePush',
					useValue: mobilePushMock,
				},
			],
		}).compile()

		mobilePushService = module.get(MobilePushStrategy)
	})

	it('should be defined', () => {
		expect(mobilePushService).toBeDefined()
	})

	describe('send', () => {
		it('should send a hello notification successfully', async () => {
			const notification: Parameters<
				INotificationStrategy<'MOBILE_PUSH'>['send']
			>[0] = {
				recipient: 'user123',
				template: 'HELLO',
				props: {
					userName: 'John',
				},
			}
			const expectedBody = 'Hello, John'

			await mobilePushService.send(notification)

			expect(templates.templates.HELLO).toHaveBeenCalledWith({
				userName: 'John',
			})
			expect(mobilePushMock.send).toHaveBeenCalledWith({
				to: 'user123',
				body: expectedBody,
				props: {
					userName: 'John',
				},
			})
		})

		it('should handle errors from mobilePush.send', async () => {
			const notification: Parameters<
				INotificationStrategy<'MOBILE_PUSH'>['send']
			>[0] = {
				recipient: 'user123',
				template: 'HELLO',
				props: {
					userName: 'John',
				},
			}

			const error = new Error('Push notification failed')
			mobilePushMock.send.mockRejectedValueOnce(error)

			await expect(mobilePushService.send(notification)).rejects.toThrow(
				'Push notification failed',
			)
			expect(templates.templates.HELLO).toHaveBeenCalledWith({
				userName: 'John',
			})
			expect(mobilePushMock.send).toHaveBeenCalledWith({
				to: 'user123',
				body: 'Hello, John',
				props: {
					userName: 'John',
				},
			})
		})
	})
})
