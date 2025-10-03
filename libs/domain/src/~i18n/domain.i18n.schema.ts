import type { I18nDict } from '@starter/i18n'

const en = {
	'workspace.invalid_default_locale': 'Invalid default locale',
} as const
type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	'workspace.invalid_default_locale': 'Locale inválido',
}

const ptBR: Translations = {
	'workspace.invalid_default_locale': 'Locale inválido',
}

export const i18nDict: I18nDict = {
	en,
	es,
	'pt-BR': ptBR,
}
