import {
	ConflictException,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EncryptService, LoggerService, UserService } from '@starter/domain'

import { JWTService } from '@/adapters/jwt'
import { SocialAuthService } from '@/adapters/social-auth'

@Injectable()
export class AuthService {
	constructor(
		@Inject(ConfigService)
		private readonly configService: ConfigService,
		@Inject(LoggerService)
		private readonly loggerService: LoggerService,
		@Inject(EncryptService)
		private readonly encryptService: EncryptService,
		@Inject(UserService)
		private readonly userService: UserService,
		@Inject(SocialAuthService)
		private readonly socialAuthService: SocialAuthService,
		@Inject(JWTService)
		private readonly jwtService: JWTService,
	) {}

	async signIn({ email, password }) {
		this.loggerService.info(
			`Attempting to sign in user with email: ${email}`,
			{},
		)

		const user = await this.userService.getUserByEmail(email)

		if (!user) {
			this.loggerService.warn(
				`Failed login attempt - user not found for email: ${email}`,
				{},
			)
			throw new UnauthorizedException('Invalid access data.')
		}

		const isValidPassword = await this.encryptService.compare(
			password,
			user.state.password,
		)

		if (!isValidPassword) {
			this.loggerService.warn(
				`Failed login attempt - invalid password for user with email: ${email}`,
				{},
			)
			throw new UnauthorizedException('Invalid access data.')
		}

		return this.grantAccessToken(user)
	}

	async socialSignOn(input) {
		const { providerId, name, email, avatar } =
			await this.socialAuthService.getInfo(input.context, input.providerToken)

		if (!email) {
			throw new UnauthorizedException('Invalid access data.')
		}

		const user = await this.userService.getUserBySocial(
			input.context,
			providerId,
			email,
		)

		// if (!user) {
		// 	const user = await this.userService.createUser({
		// 		name,
		// 		email: email ?? `${providerId}@${input.context.toLowerCase()}.com`,
		// 		phone: null,
		// 		avatar,
		// 		password: providerId,
		// 		socialFacebookId: null,
		// 		socialGoogleId: null,
		// 		status: 'ACTIVE',
		// 	})

		// 	return this.grantAccessToken(user)
		// }

		return this.grantAccessToken(user)
	}

	async signUp({ name, email, password }) {
		const emailExists = await this.userService.getUserByEmail(email)

		if (emailExists) {
			throw new ConflictException(`E-mail ${email} has already been taken.`)
		}

		// const user = await this.userService.createUser({
		// 	name,
		// 	email,
		// 	phone: null,
		// 	avatar: null,
		// 	password,
		// 	socialFacebookId: null,
		// 	socialGoogleId: null,
		// 	status: 'ACTIVE',
		// })

		// return this.grantAccessToken(user)
	}

	async forgotPassword({ email, password }) {
		const user = await this.userService.getUserByEmail(email)

		if (!user) {
			throw new UnauthorizedException('Invalid access data.')
		}

		user.state.password = await this.encryptService.hash(password)

		await this.userService.updateUser(user.state.userId, {})

		return this.grantAccessToken(user)
	}

	async grantAccessToken(user) {
		const tokenPayload = {
			userId: user.userId,
		}

		const accessToken = await this.jwtService.generate(
			tokenPayload,
			this.configService.get<string>('SERVER_AUTHENTICATE_SECRET')!,
		)

		return {
			accessToken,
		}
	}
}
