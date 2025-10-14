import type { I18nDict } from '@starter/i18n'

const en = {
	sendOTPTitle: 'Verification Code',
	sendOTPDescription:
		'Use the code provided in this email to authorize access to your account.',
	sendOTPCodeValidity:
		'This code is valid for <strong>{expiresInMinutes}</strong> minutes, starting from the moment you received this email.',
	welcomeTitle: 'Welcome to {appName:string}',
	welcomeDescription:
		"Hello {userName:string}, We're excited to have you on board. With {appName:string}, you can easily manage your products, track inventory in real time, and keep everything organized.",
	welcomeGetStarted: 'Get Started',
	welcomeThanks: 'Thanks for joining us, <br />— The {appName:string} Team',
	copyright: '© {year:number} {appName:string}. All Rights Reserved.',
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
	welcomeTitle: 'Bienvenido a {appName:string}',
	welcomeDescription:
		'Hola {userName:string}, Estamos emocionados de tenerte en nuestra plataforma. Con {appName:string}, puedes gestionar fácilmente tus productos, rastrear el inventario en tiempo real y mantener todo organizado.',
	welcomeGetStarted: 'Comenzar',
	welcomeThanks:
		'Gracias por unirte a nosotros, <br />— El equipo de {appName:string}',
	copyright: '© {year:number} {appName:string}. Todos los derechos reservados.',
}

const ptBR: Translations = {
	sendOTPTitle: 'Código de Verificação',
	sendOTPDescription:
		'Use o código fornecido neste e-mail para autorizar o acesso à sua conta.',
	sendOTPCodeValidity:
		'Este código é válido para <strong>{expiresInMinutes}</strong> minutos, começando desde o momento em que você recebeu este e-mail.',
	welcomeTitle: 'Bem-vindo a {appName:string}',
	welcomeDescription:
		'Olá {userName:string}, Estamos felizes por você estar conosco. Com {appName:string}, você pode gerenciar facilmente seus produtos, rastrear o inventário em tempo real e manter tudo organizado.',
	welcomeGetStarted: 'Começar',
	welcomeThanks: 'Obrigado por nos unir, <br />— O time de {appName:string}',
	copyright: '© {year:number} {appName:string}. Todos os direitos reservados.',
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
