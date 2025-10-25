import { uuid } from '@starter/common'
import {
	EncryptService,
	LoggerService,
	type User,
	UserService,
} from '@starter/domain'

import {
	ConflictException,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import type {
	ForgotPasswordInput,
	SignInInput,
	SignUpInput,
	SocialSignOnInput,
} from '@/core/auth/auth.service.types'
import { JWTService } from '@/adapters/jwt'
import { SocialAuthService } from '@/adapters/social-auth'
import { type I18nAPIService, I18nAPISymbol } from '@/api.i18n.module'

@Injectable()
export class AuthService {
	constructor(
		@Inject(ConfigService)
		private readonly configService: ConfigService,
		@Inject(LoggerService)
		private readonly loggerService: LoggerService,
		@Inject(JWTService)
		private readonly jwtService: JWTService,
		@Inject(EncryptService)
		private readonly encryptService: EncryptService,
		@Inject(SocialAuthService)
		private readonly socialAuthService: SocialAuthService,
		@Inject(UserService)
		private readonly userService: UserService,
		@Inject(I18nAPISymbol)
		private readonly i18nService: I18nAPIService,
	) {}

	async signIn({ email, password }: SignInInput) {
		this.loggerService.info(`Attempting to sign in user with email: ${email}`, {
			email,
		})

		const user = await this.userService.getUserByEmail(email)
		if (!user) {
			this.loggerService.warn(
				`Failed login attempt - user not found for email: ${email}`,
				{
					email,
				},
			)
			throw new UnauthorizedException(
				this.i18nService.current.invalidAccessData(),
			)
		}

		const isValidPassword = await this.encryptService.compare(
			password,
			user.state.password,
		)
		if (!isValidPassword) {
			this.loggerService.warn(
				`Failed login attempt - invalid password for user with email: ${email}`,
				{
					email,
				},
			)
			throw new UnauthorizedException(
				this.i18nService.current.invalidAccessData(),
			)
		}

		this.loggerService.info(`User signed in successfully: ${email}`, {
			email,
		})
		return this.grantAccessToken(user.state)
	}

	async socialSignOn(input: SocialSignOnInput) {
		this.loggerService.info(
			`Attempting to sign in via ${input.context} social provider`,
			{
				context: input.context,
			},
		)

		const { providerId, name, email, avatar } =
			await this.socialAuthService.getInfo(input.context, input.providerToken)

		if (!email) {
			this.loggerService.warn(
				`Failed social sign-in - missing email for ${input.context}`,
				{
					context: input.context,
				},
			)
			throw new UnauthorizedException(
				this.i18nService.current.invalidAccessData(),
			)
		}

		const existingUser = await this.userService.getUserBySocial(
			input.context,
			providerId,
			email,
		)
		if (!existingUser) {
			this.loggerService.info(
				`Attempting to create new user from ${input.context} provider for email: ${email}`,
				{
					context: input.context,
					email,
				},
			)

			const user = await this.userService.createUser({
				googleProviderExternalId: null,
				facebookProviderExternalId: null,
				addresses: [],
				permissionIds: [],
				name,
				email: email ?? `${providerId}@${input.context.toLowerCase()}.com`,
				avatar,
				password: providerId,
				status: 'ACTIVE',
			})

			this.loggerService.info(
				`User successfully created via ${input.context} provider for email: ${email}`,
				{
					context: input.context,
					email,
				},
			)
			return this.grantAccessToken(user.state)
		}

		this.loggerService.info(
			`Existing user found via ${input.context} for email: ${email}`,
			{
				context: input.context,
				email,
			},
		)
		return this.grantAccessToken(existingUser.state)
	}

	async signUp({ name, email, password }: SignUpInput) {
		this.loggerService.info(`Attempting to sign up user with email: ${email}`, {
			email,
		})

		const emailExists = await this.userService.getUserByEmail(email)
		if (emailExists) {
			this.loggerService.warn(
				`Failed sign up - email already taken: ${email}`,
				{
					email,
				},
			)
			throw new ConflictException(
				this.i18nService.current.emailHasAlreadyBeenTaken({
					email,
				}),
			)
		}

		const user = await this.userService.createUser({
			googleProviderExternalId: null,
			facebookProviderExternalId: null,
			addresses: [],
			permissionIds: [],
			name,
			email,
			password,
			status: 'ONBOARDING',
		})

		this.loggerService.info(`User signed up successfully: ${email}`, {
			email,
		})
		return this.grantAccessToken(user.state)
	}

	async forgotPassword({ email, password }: ForgotPasswordInput) {
		this.loggerService.info(
			`Attempting to reset password for user with email: ${email}`,
			{
				email,
			},
		)

		const user = await this.userService.getUserByEmail(email)

		if (!user) {
			this.loggerService.warn(
				`Failed password reset - user not found for email: ${email}`,
				{
					email,
				},
			)
			throw new UnauthorizedException(
				this.i18nService.current.invalidAccessData(),
			)
		}

		const newPassword = await this.encryptService.hash(password)

		await this.userService.updateUser(user.state.userId, {
			password: newPassword,
		})

		this.loggerService.info(
			`Password successfully reset for user with email: ${email}`,
			{
				email,
			},
		)
		return this.grantAccessToken(user.state)
	}

	async grantAccessToken(user: User) {
		this.loggerService.info(
			`Attempting to generate tokens for userId: ${user.userId}`,
			{
				userId: user.userId,
			},
		)

		const tokenPayload = {
			userId: user.userId,
		}

		const accessToken = await this.jwtService.generate(
			tokenPayload,
			this.configService.get<string>('SERVER_ACCESS_TOKEN_SECRET')!,
			{
				expiresIn: '8h',
			},
		)

		const refreshToken = await this.jwtService.generate(
			tokenPayload,
			this.configService.get<string>('SERVER_REFRESH_TOKEN_SECRET')!,
			{
				expiresIn: '7d',
			},
		)

		const tokenType = 'Bearer'
		const expiresIn = 8

		this.loggerService.info(
			`Tokens successfully generated for userId: ${user.userId}`,
			{
				userId: user.userId,
			},
		)

		return {
			accessToken,
			refreshToken,
			tokenType,
			expiresIn,
		}
	}
}
