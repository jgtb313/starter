import { describe, it, expect, vi, beforeEach, Mocked } from 'vitest'
import { Test, TestingModule } from '@nestjs/testing'

import { INotificationStrategy } from '@/ports/notification'
import * as templates from './web-push.templates'
import { WebPushStrategy } from './web-push.strategy'

vi.mock('./web-push.templates', () => ({
  templates: {
    WELCOME: vi.fn((props) => `Welcome, ${props.userName}`),
  },
}))

describe('WebPushStrategy', () => {
  let webPushService: WebPushStrategy

  const webPushMock = {
    send: vi.fn(),
  } as Mocked<INotificationStrategy<'WEB_PUSH'>>

  beforeEach(async () => {
    vi.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebPushStrategy,
        {
          provide: 'WebPush',
          useValue: webPushMock,
        },
      ],
    }).compile()

    webPushService = module.get(WebPushStrategy)
  })

  it('should be defined', () => {
    expect(webPushService).toBeDefined()
  })

  describe('send', () => {
    it('should send a welcome notification successfully', async () => {
      const notification: Parameters<INotificationStrategy<'WEB_PUSH'>['send']>[0] = {
        recipient: 'user123',
        template: 'WELCOME',
        props: { userName: 'John' },
      }
      const expectedBody = 'Welcome, John'

      await webPushService.send(notification)

      expect(templates.templates.WELCOME).toHaveBeenCalledWith({ userName: 'John' })
      expect(webPushMock.send).toHaveBeenCalledWith({
        to: 'user123',
        body: expectedBody,
        props: { userName: 'John' },
      })
    })

    it('should handle errors from webPush.send', async () => {
      const notification: Parameters<INotificationStrategy<'WEB_PUSH'>['send']>[0] = {
        recipient: 'user123',
        template: 'WELCOME',
        props: { userName: 'John' },
      }

      const error = new Error('Web push notification failed')
      webPushMock.send.mockRejectedValueOnce(error)

      await expect(webPushService.send(notification)).rejects.toThrow('Web push notification failed')
      expect(templates.templates.WELCOME).toHaveBeenCalledWith({ userName: 'John' })
      expect(webPushMock.send).toHaveBeenCalledWith({
        to: 'user123',
        body: 'Welcome, John',
        props: { userName: 'John' },
      })
    })
  })
})
