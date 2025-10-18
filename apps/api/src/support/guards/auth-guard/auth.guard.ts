import { LoggerService, UserService } from '@starter/domain'

import {
	type CanActivate,
	type ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

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
		@Inject(LoggerService)
		private readonly loggerService: LoggerService,
	) {
		console.log('AuthGuard constructor', this)
	}

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
				'SERVER_ACCESS_TOKEN_SECRET',
			)!

			const decoded = await this.jwtService.decode<{
				userId: string
			}>(accessToken, secret)

			if (!decoded) {
				throw new UnauthorizedException('Unauthorized.')
			}

			console.log(decoded)

			const user = await this.userService.getUser(decoded.userId)

			console.log(user)

			request.user = user.state
			return true
		} catch (error) {
			console.log(error)
			this.loggerService.error('Error decoding access token.', {
				error,
			})
			throw new UnauthorizedException('Unauthorized.')
		}
	}
}
