import type { I18nDict } from '@starter/i18n'

const en = {
	sendOTPTitle: 'Verification Code',
	sendOTPDescription:
		'Use the code provided in this email to authorize access to your account.',
	sendOTPCodeValidity:
		'This code is valid for <strong>{expiresInMinutes}</strong> minutes, starting from the moment you received this email.',
} as const
type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	sendOTPTitle: 'Código de Verificación',
	sendOTPDescription:
		'Use el código proporcionado en este correo electrónico para autorizar el acceso a su cuenta.',
	sendOTPCodeValidity:
		'Este código es válido para <strong>{expiresInMinutes}</strong> minutos, empezando desde el momento en que recibió este correo electrónico.',
}

const ptBR: Translations = {
	sendOTPTitle: 'Código de Verificação',
	sendOTPDescription:
		'Use o código fornecido neste e-mail para autorizar o acesso à sua conta.',
	sendOTPCodeValidity:
		'Este código é válido para <strong>{expiresInMinutes}</strong> minutos, começando desde o momento em que você recebeu este e-mail.',
}

export const i18nDict: I18nDict = {
	en,
	es,
	'pt-BR': ptBR,
}

export type I18nEmails = {
	en: typeof en
	es: typeof es
	'pt-BR': typeof ptBR
}
