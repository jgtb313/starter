import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import type { INotificationStrategy } from '@/ports/notification'

import { SMSStrategy } from './sms.strategy'
import * as templates from './sms.templates'

vi.mock('./sms.templates', () => ({
	templates: {
		SEND_OTP: vi.fn((props) => `Your OTP code is ${props.code}`),
	},
}))

describe('SMSStrategy', () => {
	let smsService: SMSStrategy

	const smsMock = {
		send: vi.fn(),
	} as Mocked<INotificationStrategy<'SMS'>>

	beforeEach(async () => {
		vi.clearAllMocks()

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SMSStrategy,
				{
					provide: 'SMS',
					useValue: smsMock,
				},
			],
		}).compile()

		smsService = module.get(SMSStrategy)
	})

	it('should be defined', () => {
		expect(smsService).toBeDefined()
	})

	describe('send', () => {
		it('should send an OTP notification successfully', async () => {
			const notification: Parameters<INotificationStrategy<'SMS'>['send']>[0] =
				{
					recipient: '1234567890',
					template: 'SEND_OTP',
					props: {
						code: '123456',
					},
				}
			const expectedBody = 'Your OTP code is 123456'

			await smsService.send(notification)

			expect(templates.templates.SEND_OTP).toHaveBeenCalledWith({
				code: '123456',
			})
			expect(smsMock.send).toHaveBeenCalledWith({
				to: '1234567890',
				body: expectedBody,
			})
		})

		it('should handle errors from sms.send', async () => {
			const notification: Parameters<INotificationStrategy<'SMS'>['send']>[0] =
				{
					recipient: '1234567890',
					template: 'SEND_OTP',
					props: {
						code: '123456',
					},
				}

			const error = new Error('SMS notification failed')
			smsMock.send.mockRejectedValueOnce(error)

			await expect(smsService.send(notification)).rejects.toThrow(
				'SMS notification failed',
			)
			expect(templates.templates.SEND_OTP).toHaveBeenCalledWith({
				code: '123456',
			})
			expect(smsMock.send).toHaveBeenCalledWith({
				to: '1234567890',
				body: 'Your OTP code is 123456',
			})
		})
	})
})
