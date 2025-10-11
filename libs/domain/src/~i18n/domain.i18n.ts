import type { I18nDict } from '@starter/i18n'

const en = {
	userAlreadyHasWorkspace: 'User already has a workspace.',
	workspaceAlreadyActive: 'This workspace is already active.',
	workspaceAlreadyInactive: 'This workspace is already inactive.',
	workspaceNotFound: 'Workspace {workspaceId:string} not found.',
	userNotFound: 'User {userId:string} not found.',
} as const
type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	userAlreadyHasWorkspace: 'El usuario ya tiene un workspace.',
	workspaceAlreadyActive: 'Este workspace ya está activo.',
	workspaceAlreadyInactive: 'Este workspace ya está inactivo.',
	workspaceNotFound: 'El workspace {workspaceId:string} no existe.',
	userNotFound: 'El usuario {userId:string} no existe.',
}

const ptBR: Translations = {
	userAlreadyHasWorkspace: 'Já existe um workspace para este usuário.',
	workspaceAlreadyActive: 'Este workspace já está ativo.',
	workspaceAlreadyInactive: 'Este workspace já está inativo.',
	workspaceNotFound: 'O workspace {workspaceId:string} não existe.',
	userNotFound: 'O usuário {userId:string} não existe.',
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
