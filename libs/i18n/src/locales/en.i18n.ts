export const translationsEn = {
	hi: 'Hello {name:string}, age:{age:number}!',
} as const

export type BaseTranslations = {
	[K in keyof typeof translationsEn]: string
}
