import type { I18nDict } from '@starter/i18n'

const en = {
	workspaceInvalidDefaultLocale: 'Invalid default locale',
} as const
type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	workspaceInvalidDefaultLocale: 'Locale inválido',
}

const ptBR: Translations = {
	workspaceInvalidDefaultLocale: 'Locale inválido',
}

export const i18nDict: I18nDict = {
	en,
	es,
	'pt-BR': ptBR,
}
