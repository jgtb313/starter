import * as renderEmail from '@starter/emails'

import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import type {
	INotificationStrategy,
	NotificationInput,
} from '@/ports/notification'

import { EmailStrategy } from './email.strategy'

vi.mock('@starter/emails', () => ({
	renderEmail: vi.fn(),
}))

describe('EmailStrategy', () => {
	let emailService: EmailStrategy

	const emailMock = {
		send: vi.fn(),
	} as Mocked<INotificationStrategy<'EMAIL'>>

	beforeEach(async () => {
		vi.clearAllMocks()

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EmailStrategy,
				{
					provide: 'Email',
					useValue: emailMock,
				},
			],
		}).compile()

		emailService = module.get(EmailStrategy)
	})

	it('should be defined', () => {
		expect(emailService).toBeDefined()
	})

	describe('send', () => {
		it('should render and send an email', async () => {
			const notification: NotificationInput<'EMAIL', 'WELCOME'> = {
				recipient: 'test@email.com',
				template: 'WELCOME',
				props: {
					userName: 'John Doe',
					getStartedUrl: 'https://example.com',
				},
			}

			vi.spyOn(renderEmail, 'renderEmail').mockResolvedValueOnce({
				subject: 'Welcome!',
				html: '<p>Welcome to our service!</p>',
			})

			await emailService.send(notification)

			expect(renderEmail.renderEmail).toHaveBeenCalledWith({
				template: notification.template,
				props: notification.props,
			})
			expect(emailMock.send).toHaveBeenCalledWith({
				to: 'test@email.com',
				subject: 'Welcome!',
				body: '<p>Welcome to our service!</p>',
			})
		})
	})
})
