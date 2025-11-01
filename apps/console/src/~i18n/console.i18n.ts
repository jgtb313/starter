import type { I18nDict } from '@starter/i18n'

const en = {
	signIn: 'Sign In',
} as const
type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	signIn: 'Iniciar sesión',
}

const ptBR: Translations = {
	signIn: 'Iniciar sessão',
}

export const i18nDict: I18nDict = {
	en,
	es,
	'pt-BR': ptBR,
}

export type I18nConsole = {
	en: typeof en
	es: typeof es
	'pt-BR': typeof ptBR
}
