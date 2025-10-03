import type { I18nDict } from '@starter/i18n'

const en = {
	workspaceAlreadyActive: 'This workspace is already active.',
	workspaceAlreadyInactive: 'This workspace is already inactive.',
} as const
type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	workspaceAlreadyActive: 'Este workspace ya está activo.',
	workspaceAlreadyInactive: 'Este workspace ya está inactivo.',
}

const ptBR: Translations = {
	workspaceAlreadyActive: 'Este workspace já está ativo.',
	workspaceAlreadyInactive: 'Este workspace já está inativo.',
}

export const i18nDict: I18nDict = {
	en,
	es,
	'pt-BR': ptBR,
}

export type I18nDomain = {
	en: typeof en
	es: typeof es
	'pt-BR': typeof ptBR
}
