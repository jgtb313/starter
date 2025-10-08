import {
	type CanActivate,
	type ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from '@starter/domain'

import { JWTService } from '@/adapters/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@Inject(ConfigService)
		private readonly configService: ConfigService,
		@Inject(JWTService)
		private readonly jwtService: JWTService,
		@Inject(UserService)
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
			const secret = this.configService.get<string>(
				'SERVER_AUTHENTICATE_SECRET',
			)!

			const decoded = await this.jwtService.decode<{
				userId: string
			}>(accessToken, secret)

			if (!decoded) {
				throw new UnauthorizedException('Unauthorized.')
			}

			const user = await this.userService.getUser(decoded.userId)

			request.user = user.state
			return true
		} catch (error) {
			throw new UnauthorizedException('Unauthorized.')
		}
	}
}
