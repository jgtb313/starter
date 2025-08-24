import { Test, type TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, type Mocked, vi } from 'vitest'

import { WhatsappStrategy } from './whatsapp.strategy'
import * as templates from './whatsapp.templates'

import type { INotificationStrategy } from '@/ports/notification'

vi.mock('./whatsapp.templates', () => ({
	templates: {
		SEND_OTP: vi.fn((props) => ({
			contentSid: 'HX1234567890',
			contentVariables: {
				1: props.code,
			},
		})),
	},
}))

describe('WhatsappStrategy', () => {
	let whatsappService: WhatsappStrategy

	const whatsappMock = {
		send: vi.fn(),
	} as Mocked<INotificationStrategy<'WHATSAPP'>>

	beforeEach(async () => {
		vi.clearAllMocks()

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WhatsappStrategy,
				{
					provide: 'WHATSAPP',
					useValue: whatsappMock,
				},
			],
		}).compile()

		whatsappService = module.get(WhatsappStrategy)
	})

	it('should be defined', () => {
		expect(whatsappService).toBeDefined()
	})

	describe('send', () => {
		it('should send an OTP notification successfully', async () => {
			const notification: Parameters<
				INotificationStrategy<'WHATSAPP'>['send']
			>[0] = {
				recipient: '1234567890',
				template: 'SEND_OTP',
				props: {
					code: '123456',
				},
			}

			await whatsappService.send(notification)

			expect(templates.templates.SEND_OTP).toHaveBeenCalledWith({
				code: '123456',
			})
			expect(whatsappMock.send).toHaveBeenCalledWith({
				to: '1234567890',
				contentSid: 'HX1234567890',
				contentVariables: {
					1: '123456',
				},
			})
		})

		it('should handle errors from whatsapp.send', async () => {
			const notification: Parameters<
				INotificationStrategy<'WHATSAPP'>['send']
			>[0] = {
				recipient: '1234567890',
				template: 'SEND_OTP',
				props: {
					code: '123456',
				},
			}

			const error = new Error('Whatsapp notification failed')
			whatsappMock.send.mockRejectedValueOnce(error)

			await expect(whatsappService.send(notification)).rejects.toThrow(
				'Whatsapp notification failed',
			)
			expect(templates.templates.SEND_OTP).toHaveBeenCalledWith({
				code: '123456',
			})
			expect(whatsappMock.send).toHaveBeenCalledWith({
				to: '1234567890',
				contentSid: 'HX1234567890',
				contentVariables: {
					1: '123456',
				},
			})
		})
	})
})
