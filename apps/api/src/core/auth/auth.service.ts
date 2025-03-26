import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LoggerService, EncryptService, UserService, PERMISSIONS, User, UserStatusEnum } from '@starter/domain'

import { SocialAuthEnum } from '@/ports/social-auth'
import { SocialAuthService } from '@/adapters/social-auth'
import { JWTService } from '@/adapters/jwt'

export type SignInInput = {
  email: string
  password: string
}

export type SocialSignOnInput = {
  context: SocialAuthEnum
  providerToken: string
}

export type SignUpInput = {
  name: string
  email: string
  password: string
}

export type ForgotPasswordInput = {
  email: string
  password: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    private readonly encryptService: EncryptService,
    private readonly userService: UserService,
    private readonly socialAuthService: SocialAuthService,
    private readonly jwtService: JWTService,
  ) {}

  async signIn({ email, password }: SignInInput) {
    this.loggerService.info(`Attempting to sign in user with email: ${email}`, {})

    const user = await this.userService.findOne({ email })

    if (!user) {
      this.loggerService.warn(`Failed login attempt - user not found for email: ${email}`, {})
      throw new UnauthorizedException('Invalid access data.')
    }

    const isValidPassword = await this.encryptService.compare(password, user.password)

    if (!isValidPassword) {
      this.loggerService.warn(`Failed login attempt - invalid password for user with email: ${email}`, {})
      throw new UnauthorizedException('Invalid access data.')
    }

    return this.grantAccessToken(user)
  }

  async socialSignOn(input: SocialSignOnInput) {
    const { providerId, name, email, avatar } = await this.socialAuthService.getInfo(input.context, input.providerToken)

    const user = await this.userService.findBySocial(input.context, { socialId: providerId, email })

    if (!user) {
      const user = await this.userService.create({
        organizations: [],
        permissions: [...PERMISSIONS],
        name,
        email: email ?? `${providerId}@${input.context.toLowerCase()}.com`,
        phone: null,
        avatar,
        password: providerId,
        social: {
          facebookId: input.context === SocialAuthEnum.FACEBOOK ? providerId : null,
          googleId: input.context === SocialAuthEnum.GOOGLE ? providerId : null,
        },
        status: UserStatusEnum.ACTIVE,
      })

      return this.grantAccessToken(user)
    }

    return this.grantAccessToken(user)
  }

  async signUp({ name, email, password }: SignUpInput) {
    const emailExists = await this.userService.findOne({
      email,
    })

    if (emailExists) {
      throw new ConflictException(`E-mail ${email} has already been taken.`)
    }

    const user = await this.userService.create({
      organizations: [],
      permissions: [...PERMISSIONS],
      name,
      email,
      phone: null,
      avatar: null,
      password,
      social: {
        facebookId: null,
        googleId: null,
      },
      status: UserStatusEnum.ACTIVE,
    })

    return this.grantAccessToken(user)
  }

  async forgotPassword({ email, password }: ForgotPasswordInput) {
    const user = await this.userService.findOne({ email })

    if (!user) {
      throw new UnauthorizedException('Invalid access data.')
    }

    user.password = await this.encryptService.hash(password)

    await this.userService.updateById(user.userId, {
      ...user,
      organizations: [],
    })

    return this.grantAccessToken(user)
  }

  async grantAccessToken(user: User) {
    const tokenPayload = {
      userId: user.userId,
    }

    const accessToken = await this.jwtService.generate(tokenPayload, this.configService.get<string>('SERVER_AUTHENTICATE_SECRET')!)

    return {
      accessToken,
    }
  }
}
