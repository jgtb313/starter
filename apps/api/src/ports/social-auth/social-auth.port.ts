export enum SocialAuthEnum {
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK',
}

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
		context: SocialAuthEnum,
		providerToken: string,
	) => Promise<SocialAuthGetInfoOutput>
}
