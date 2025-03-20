import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Test, TestingModule } from '@nestjs/testing'

import { NotificationService } from './notification.service'
import { EmailStrategy, SMSStrategy, WhatsappStrategy, WebPushStrategy, MobilePushStrategy } from './strategies'

describe('NotificationService', () => {
  let notificationService: NotificationService

  const mockEmailStrategy = { send: vi.fn() }
  const mockSMSStrategy = { send: vi.fn() }
  const mockWhatsappStrategy = { send: vi.fn() }
  const mockWebPushStrategy = { send: vi.fn() }
  const mockMobilePushStrategy = { send: vi.fn() }

  beforeEach(async () => {
    vi.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: EmailStrategy, useValue: mockEmailStrategy },
        { provide: SMSStrategy, useValue: mockSMSStrategy },
        { provide: WhatsappStrategy, useValue: mockWhatsappStrategy },
        { provide: WebPushStrategy, useValue: mockWebPushStrategy },
        { provide: MobilePushStrategy, useValue: mockMobilePushStrategy },
      ],
    }).compile()

    notificationService = module.get(NotificationService)

    console.log('NotificationService after get:', notificationService)
  })

  it('should be defined', () => {
    expect(notificationService).toBeDefined()
  })

  // it('should call emailService.send when channel is EMAIL', () => {
  //   const notification: NotificationInput<'EMAIL', 'SEND_OTP'> = { template: 'SEND_OTP', recipient: 'test@example.com', props: { code: '0000' } }

  //   notificationService.send('EMAIL', notification)

  //   expect(mockEmailService.send).toHaveBeenCalledWith(notification)
  // })

  // it('should call smsService.send when channel is SMS', () => {
  //   const notification = { recipient: '+1234567890', content: 'Test message' }
  //   notificationService.send('SMS', notification)
  //   expect(mockSMSStrategy.send).toHaveBeenCalledWith(notification)
  // })

  // it('should call whatsappService.send when channel is WHATSAPP', () => {
  //   const notification = { recipient: '+1234567890', content: 'Test message' }
  //   notificationService.send('WHATSAPP', notification)
  //   expect(mockWhatsappStrategy.send).toHaveBeenCalledWith(notification)
  // })

  // it('should call webPushService.send when channel is WEB_PUSH', () => {
  //   const notification = { recipient: 'user123', content: 'Test message' }
  //   notificationService.send('WEB_PUSH', notification)
  //   expect(mockWebPushStrategy.send).toHaveBeenCalledWith(notification)
  // })

  // it('should call mobilePushService.send when channel is MOBILE_PUSH', () => {
  //   const notification = { recipient: 'device123', content: 'Test message' }
  //   notificationService.send('MOBILE_PUSH', notification)
  //   expect(mockMobilePushStrategy.send).toHaveBeenCalledWith(notification)
  // })
})
