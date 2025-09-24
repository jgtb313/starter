import type { I18nDict } from '@starter/i18n'

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

export const i18nDict: I18nDict = {
	en,
	es,
	'pt-BR': ptBR,
}

export type I18nAPI = {
	en: typeof en
	es: typeof es
	'pt-BR': typeof ptBR
}
