import type { I18nDict } from '@starter/i18n'

const en = {
	emailHasAlreadyBeenTaken: 'Email {email:string} has already been taken.',
	invalidAccessData: 'Invalid access data.',
} as const
type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	emailHasAlreadyBeenTaken: 'El correo {email:string} ya está en uso.',
	invalidAccessData: 'Datos de acceso no válidos.',
}

const ptBR: Translations = {
	emailHasAlreadyBeenTaken: 'O e-mail {email:string} já está em uso.',
	invalidAccessData: 'Dados de acesso inválidos.',
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
