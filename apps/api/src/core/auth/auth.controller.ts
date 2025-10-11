import { Inject, UnauthorizedException } from '@nestjs/common'
import { OTPService, UserService } from '@starter/domain'
import { Controller, Request, Route } from '@starter/nestjs-server-hoisting'

import {
	type ForgotPasswordRequest,
	ForgotPasswordSchema,
	type PasswordLessRequest,
	PasswordLessSchema,
	type SignInRequest,
	SignInSchema,
	type SignUpRequest,
	SignUpSchema,
	type SocialSignOnRequest,
	SocialSignOnSchema,
} from '@/core/auth/auth.controller.schema'
import { AuthService } from '@/core/auth/auth.service'
import { type I18nAPIService, I18nAPISymbol } from '@/api.i18n.module'

@Controller({
	name: 'Auth',

	description: 'Provides functionalities for user authentication.',

	basePath: 'auth',

	schemas: {},
})
export class AuthController {
	constructor(
		@Inject(AuthService)
		private readonly authService: AuthService,
		@Inject(UserService)
		private readonly userService: UserService,
		@Inject(OTPService)
		private readonly otpService: OTPService,
		@Inject(I18nAPISymbol)
		private readonly i18nService: I18nAPIService,
	) {}

	@Route({
		summary: 'Sign In',
		description: 'Authenticates a user by verifying their email and password.',

		method: 'POST',

		path: '/sign-in',

		parameters: {
			body: SignInSchema.body,
		},

		responses: {
			200: {
				schema: SignInSchema.output,
			},
			401: {
				description: 'Invalid access data.',
			},
		},
	})
	signIn(@Request() { body }: SignInRequest) {
		return this.authService.signIn(body)
	}

	@Route({
		summary: 'Password Less',
		description:
			'Allows users to authenticate by using an OTP sent to their email, without requiring a password.',

		method: 'POST',

		path: '/password-less',

		parameters: {
			body: PasswordLessSchema.body,
		},

		responses: {
			200: {
				schema: PasswordLessSchema.output,
			},
			401: {
				description: 'Invalid access data.',
			},
			403: {
				description: 'OTP expired.',
			},
			404: {
				description: 'OTP {{otpId}} not found.',
			},
			409: [
				{
					description: 'OTP insufficient resend time, please try again later.',
				},
				{
					description: 'OTP daily attempt limit exceeded.',
				},
				{
					description: 'OTP attempts expired.',
				},
			],
		},
	})
	async passwordLess(@Request() { body }: PasswordLessRequest) {
		const user = await this.userService.getUserByEmail(body.email)

		if (!user) {
			throw new UnauthorizedException(
				this.i18nService.current.invalidAccessData(),
			)
		}

		await this.otpService.validateOTP({
			...body.otpVerification,
			context: 'PASSWORD_LESS',
			recipient: body.email,
		})

		return this.authService.grantAccessToken(user)
	}

	@Route({
		summary: 'Social Sign-On',
		description:
			'Allows users to sign in using third-party services (such as Google, Facebook, etc.), providing a seamless authentication experience.',

		method: 'POST',

		path: '/social-sign-on',

		parameters: {
			body: SocialSignOnSchema.body,
		},

		responses: {
			200: {
				schema: SocialSignOnSchema.output,
			},
			401: {
				description: 'Invalid access data.',
			},
		},
	})
	socialSignOn(@Request() { body }: SocialSignOnRequest) {
		return this.authService.socialSignOn(body)
	}

	@Route({
		summary: 'Sign Up',
		description: 'Creates a new user account.',

		method: 'POST',

		path: '/sign-up',

		parameters: {
			body: SignUpSchema.body,
		},

		responses: {
			201: {
				schema: SignUpSchema.output,
			},
			409: {
				description: 'E-mail {{email}} has already been taken.',
			},
		},
	})
	signUp(@Request() { body }: SignUpRequest) {
		return this.authService.signUp(body)
	}

	@Route({
		summary: 'Forgot Password',
		description:
			'Validates the OTP sent to the user’s email and allows them to reset their password.',

		method: 'POST',

		path: '/forgot-password',

		parameters: {
			body: ForgotPasswordSchema.body,
		},

		responses: {
			200: {
				schema: ForgotPasswordSchema.output,
			},
			401: {
				description: 'Invalid access data.',
			},
			403: {
				description: 'OTP expired.',
			},
			404: {
				description: 'OTP {{otpId}} not found.',
			},
			409: [
				{
					description: 'OTP insufficient resend time, please try again later.',
				},
				{
					description: 'OTP daily attempt limit exceeded.',
				},
				{
					description: 'OTP attempts expired.',
				},
			],
		},
	})
	async forgotPassword(@Request() { body }: ForgotPasswordRequest) {
		await this.otpService.validateOTP({
			...body.otpVerification,
			context: 'FORGOT_PASSWORD',
			recipient: body.email,
		})

		return this.authService.forgotPassword({
			email: body.email,
			password: body.password,
		})
	}
}
