// import type { I18nDict } from '@starter/i18n'

const en = {
	hello: 'Hello {name:string} your age is {age:number}',
} as const
type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	hello: 'Hola {name:string}',
}

const ptBR: Translations = {
	hello: 'Olá {name:string}',
}

// export const i18nDict: I18nDict = {
// 	en,
// 	es,
// 	'pt-BR': ptBR,
// }

// export type I18nConsole = {
// 	en: typeof en
// 	es: typeof es
// 	'pt-BR': typeof ptBR
// }
