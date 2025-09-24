export const en = {
	hello: 'Hello {name:string}',
} as const
export type Translations = {
	[K in keyof typeof en]: string
}

export const es: Translations = {
	hello: 'Hola {name:string}',
}

export const ptBR: Translations = {
	hello: 'Olá {name:string}',
}

export type I18nApi = {
	en: typeof en
	es: typeof es
	'pt-BR': typeof ptBR
}
