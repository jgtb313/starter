import { z } from '@starter/schema'

export const SocialAuthSchema = z.enum([
	'GOOGLE',
	'FACEBOOK',
])
export type SocialAuth = z.infer<typeof SocialAuthSchema>

export type SocialAuthGetInfoOutput = {
	providerId: string
	name: string
	email: string | null
	avatar: string | null
}

export type ISocialAuthStrategy = {
	getInfo: (providerToken: string) => Promise<SocialAuthGetInfoOutput>
}

export type ISocialAuth = {
	getInfo: (
		context: SocialAuth,
		providerToken: string,
	) => Promise<SocialAuthGetInfoOutput>
}
