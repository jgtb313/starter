import { Test, TestingModule } from '@nestjs/testing'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NotFoundException, ConflictException } from '@starter/nestjs-error-handling'
import { addSeconds, subSeconds, uuid } from '@starter/common'

import { OTPService } from '@/core/otp/otp.service'
import { IOTPRepository } from '@/ports/database/otp'
import { OTPRepositoryModule } from '@/adapters/database/otp/otp.repository.module'
import { InMemoryDatabaseModule } from '@/adapters/database'
import { NotificationService } from '@/adapters/notification'
import { UserService } from '@/core/user/user.service'
import { OTPContextEnum } from '@/core/otp/otp-context.domain'
import { OTP, OTPChannelEnum, OTPPhoneChannelEnum } from '@/core/otp/otp.schema'
import { makeOTP, otpMocks } from '@/core/otp/otp.mock'

describe('OTPService', () => {
  let service: OTPService
  let repository: IOTPRepository

  const userServiceMock = {
    getUser: vi.fn(),
    getUserByEmail: vi.fn(),
    getUserByPhone: vi.fn(),
  }

  const notificationServiceMock = {
    send: vi.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDatabaseModule.register(), OTPRepositoryModule],
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

    for (const otp of otpMocks) {
      await repository.create(otp.state)
    }

    vi.clearAllMocks()
  })

  it('should service be defined', () => {
    expect(service).toBeDefined()
  })

  describe('sendOTP', () => {
    it.each([OTPChannelEnum.EMAIL, OTPChannelEnum.SMS, OTPChannelEnum.WHATSAPP])(
      'should create an OTP and call notification service',
      async (channel) => {
        const input: Pick<OTP, 'userId' | 'channel' | 'context' | 'recipient'> = {
          userId: null,
          channel,
          context: OTPContextEnum.FORGOT_PASSWORD,
          recipient: 'recipient',
        }

        const otp = await service.sendOTP(input)

        expect(otp.state.otpId).toBeDefined()
        expect(notificationServiceMock.send).toHaveBeenCalled()
      },
    )

    it('should work even if a previous OTP exists within the resend cooldown interval', async () => {
      const input = makeOTP({
        userId: null,
        channel: OTPChannelEnum.EMAIL,
        context: OTPContextEnum.FORGOT_PASSWORD,
        recipient: 'recipient',
        createdAt: subSeconds(new Date(), 300).toISOString(),
      })

      await repository.create(input.state)

      const otp = await service.sendOTP({
        userId: input.state.userId,
        channel: input.state.channel,
        context: input.state.context,
        recipient: input.state.recipient,
      })

      expect(otp.state.otpId).toBeDefined()
      expect(notificationServiceMock.send).toHaveBeenCalled()
    })
  })

  describe('validateOTP', () => {
    it('should validate OTP correctly', async () => {
      const code = '1000'

      const otp = makeOTP({
        code,
      })

      await repository.create(otp.state)

      await expect(
        service.validateOTP({
          ...otp.state,
          code,
        }),
      ).resolves.not.toThrow()
    })

    it('should throw if OTP does not exist', async () => {
      const otpId = uuid()

      await expect(
        service.validateOTP({
          otpId,
          context: OTPContextEnum.UPDATE_EMAIL,
          code: '0000',
          recipient: 'notfound@example.com',
        }),
      ).rejects.toThrow(new NotFoundException(`OTP ${otpId} not found`))
    })

    it('should call otpRepository.updateById', async () => {
      const code = '1000'
      const otp = makeOTP({ code })

      const spy = vi.spyOn(repository, 'updateById')

      await repository.create(otp.state)

      await service.validateOTP({
        ...otp.state,
        code,
      })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(otp.state.otpId, expect.any(Object))
    })
  })

  describe('sendPasswordLess', () => {
    it('should call send if user exists', async () => {
      const user = { userId: uuid(), email: 'user@example.com' }
      userServiceMock.getUserByEmail.mockResolvedValue(user)

      const spy = vi.spyOn(service, 'sendOTP')

      await service.sendPasswordLess({ recipient: user.email })

      expect(userServiceMock.getUserByEmail).toHaveBeenCalledWith(user.email)
      expect(spy).toHaveBeenCalledWith({
        userId: user.userId,
        channel: OTPChannelEnum.EMAIL,
        context: OTPContextEnum.PASSWORD_LESS,
        recipient: user.email,
      })
    })

    it('should return undefined if user is not found', async () => {
      userServiceMock.getUserByEmail.mockResolvedValue(null)

      const result = await service.sendPasswordLess({ recipient: 'notfound@example.com' })

      expect(userServiceMock.getUserByEmail).toHaveBeenCalledWith('notfound@example.com')
      expect(result).toBeUndefined()
    })
  })

  describe('sendForgotPassword', () => {
    it('should call send if user exists', async () => {
      const user = { userId: uuid(), email: 'user@example.com' }
      userServiceMock.getUserByEmail.mockResolvedValue(user)

      const spy = vi.spyOn(service, 'sendOTP')

      await service.sendForgotPassword({ recipient: user.email })

      expect(userServiceMock.getUserByEmail).toHaveBeenCalledWith(user.email)
      expect(spy).toHaveBeenCalledWith({
        userId: user.userId,
        channel: OTPChannelEnum.EMAIL,
        context: OTPContextEnum.FORGOT_PASSWORD,
        recipient: user.email,
      })
    })

    it('should return undefined if user is not found', async () => {
      userServiceMock.getUserByEmail.mockResolvedValue(null)

      const result = await service.sendForgotPassword({ recipient: 'notfound@example.com' })

      expect(userServiceMock.getUserByEmail).toHaveBeenCalledWith('notfound@example.com')
      expect(result).toBeUndefined()
    })
  })

  describe('sendUpdateEmail', () => {
    it('should call send if user exists', async () => {
      const user = { userId: uuid(), email: 'user@example.com' }
      userServiceMock.getUserByEmail.mockResolvedValue(user)

      const spy = vi.spyOn(service, 'sendOTP')

      await service.sendUpdateEmail({ userId: user.userId, email: user.email })

      expect(userServiceMock.getUserByEmail).toHaveBeenCalledWith(user.email)
      expect(spy).toHaveBeenCalledWith({
        userId: user.userId,
        channel: OTPChannelEnum.EMAIL,
        context: OTPContextEnum.UPDATE_EMAIL,
        recipient: user.email,
      })
    })

    it('should throw ConflictException if email is already taken by another user', async () => {
      const user = { userId: uuid() }
      userServiceMock.getUserByEmail.mockResolvedValue(user)

      const input = {
        userId: uuid(),
        email: 'taken@example.com',
      }

      await expect(service.sendUpdateEmail(input)).rejects.toThrowError(ConflictException)
      expect(userServiceMock.getUserByEmail).toHaveBeenCalledWith(input.email)
    })
  })

  describe('sendUpdatePhone', () => {
    it.each([OTPPhoneChannelEnum.SMS, OTPPhoneChannelEnum.WHATSAPP])('should call send if user exists', async (channel) => {
      const user = { userId: uuid(), phone: { iso: 'BR', ddi: '+55', number: '98991143200' } }
      userServiceMock.getUserByEmail.mockResolvedValue(user)

      const spy = vi.spyOn(service, 'sendOTP')

      await service.sendUpdatePhone(channel, { userId: user.userId, phone: { iso: 'BR', ddi: '+55', number: '98991143200' } })

      expect(userServiceMock.getUserByPhone).toHaveBeenCalledWith(user.phone)
      expect(spy).toHaveBeenCalledWith({
        userId: user.userId,
        channel,
        context: OTPContextEnum.UPDATE_PHONE,
        recipient: `${user.phone.ddi}${user.phone.number}`,
      })
    })

    it('should throw ConflictException if email is already taken by another user', async () => {
      const user = { userId: uuid() }
      userServiceMock.getUserByPhone.mockResolvedValue(user)

      const input = {
        userId: uuid(),
        phone: { iso: 'BR', ddi: '+55', number: '98991143200' },
      }

      await expect(service.sendUpdatePhone(OTPPhoneChannelEnum.SMS, input)).rejects.toThrowError(ConflictException)
      expect(userServiceMock.getUserByPhone).toHaveBeenCalledWith(input.phone)
    })
  })
})
