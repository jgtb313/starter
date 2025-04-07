import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from '@starter/domain'

import { JWTService } from '@/adapters/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized.')
    }

    const [accessToken] = authorization.split(' ').reverse()

    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized.')
    }

    try {
      const secret = this.configService.get<string>('SERVER_AUTHENTICATE_SECRET')!

      const decoded = await this.jwtService.decode<{ userId: string }>(accessToken, secret)

      if (!decoded) {
        throw new UnauthorizedException('Unauthorized.')
      }

      request.user = await this.userService.getUser(decoded.userId)
      return true
    } catch (error) {
      throw new UnauthorizedException('Unauthorized.')
    }
  }
}
