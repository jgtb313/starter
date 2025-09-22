export const translationsEn = {
	hi: 'Hello {name:string}, age:{age:number}!',
	hello: 'Hello {name:string}, variavel: {variavel:string}!',
} as const

export type BaseTranslations = {
	[K in keyof typeof translationsEn]: string
}
