import type { SocialAuth } from '@/ports/social-auth'

export type SignInInput = {
	email: string
	password: string
}

export type SocialSignOnInput = {
	context: SocialAuth
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
