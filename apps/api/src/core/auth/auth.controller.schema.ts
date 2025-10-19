import { EmailSchema, PasswordSchema, z } from '@starter/schema'
import { OTPSchema, UserSchema } from '@starter/domain'
import {
	createRequestSchema,
	type RequestInput,
} from '@starter/nestjs-server-hoisting'

import { SocialAuthSchema } from '@/ports/social-auth'

const OTPVerificationSchema = z.object({
	otpVerification: OTPSchema.pick({
		otpId: true,
	}).and(
		z.object({
			code: z.string().min(4).max(4).meta({
				example: '0000',
			}),
		}),
	),
})
export type OTPVerificationInput = z.input<typeof OTPVerificationSchema>

export const AuthenticatedSchema = z.object({
	accessToken: z.string().meta({
		description: 'JWT access token used to authenticate API requests.',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
	}),

	refreshToken: z.string().meta({
		description: 'JWT refresh token used to obtain new access tokens.',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
	}),

	tokenType: z.string().default('Bearer').meta({
		description: 'Type of token returned. Usually "Bearer".',
		example: 'Bearer',
	}),

	expiresIn: z.number().meta({
		description: 'Access token expiration time in hours.',
		example: 8,
	}),
})

export const SignInSchema = createRequestSchema({
	body: z.object({
		email: EmailSchema,
		password: z.string().min(1),
	}),
	output: AuthenticatedSchema,
})
export type SignInRequest = RequestInput<typeof SignInSchema>

export const PasswordLessSchema = createRequestSchema({
	body: z
		.object({
			email: EmailSchema,
		})
		.and(OTPVerificationSchema),
	output: AuthenticatedSchema,
})
export type PasswordLessRequest = RequestInput<typeof PasswordLessSchema>

export const SocialSignOnSchema = createRequestSchema({
	body: z.object({
		context: SocialAuthSchema,
		providerToken: z.string().min(1),
	}),
	output: AuthenticatedSchema,
})
export type SocialSignOnRequest = RequestInput<typeof SocialSignOnSchema>

export const SignUpSchema = createRequestSchema({
	body: UserSchema.pick({
		name: true,
		email: true,
		password: true,
	}),
	output: AuthenticatedSchema,
})
export type SignUpRequest = RequestInput<typeof SignUpSchema>

export const ForgotPasswordSchema = createRequestSchema({
	body: z
		.object({
			email: EmailSchema,
			password: PasswordSchema,
		})
		.and(OTPVerificationSchema),
	output: AuthenticatedSchema,
})
export type ForgotPasswordRequest = RequestInput<typeof ForgotPasswordSchema>
