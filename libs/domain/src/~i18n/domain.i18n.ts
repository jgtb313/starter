import type { I18nDict } from '@starter/i18n'

const en = {
	// User
	userAlreadyHasWorkspace: 'User already has a workspace.',
	userAlreadyOnboarding: 'This user is already onboarding.',
	userAlreadyActive: 'This user is already active.',
	userAlreadyInactive: 'This user is already inactive.',
	userNotFound: 'User {userId:string} not found.',

	// Workspace
	workspaceAlreadyTrial: 'This workspace is already in trial.',
	workspaceAlreadyActive: 'This workspace is already active.',
	workspaceAlreadyInactive: 'This workspace is already inactive.',
	workspaceNotFound: 'Workspace {workspaceId:string} not found.',

	// Organization
	organizationAlreadyActive: 'This organization is already active.',
	organizationAlreadyInactive: 'This organization is already inactive.',
	organizationNotFound: 'Organization {organizationId:string} not found.',

	// Plan
	planAlreadyActive: 'This plan is already active.',
	planAlreadyInactive: 'This plan is already inactive.',
	planNotFound: 'Plan {planId:string} not found.',

	// Role
	roleAlreadyActive: 'This role is already active.',
	roleAlreadyInactive: 'This role is already inactive.',
	roleNotFound: 'Role {roleId:string} not found.',
	roleIdsNotFound: 'The following roles were not found: {roleIds:string[]}.',

	// Invoice
	invoiceAlreadyPending: 'This invoice is already pending.',
	invoiceAlreadyPaid: 'This invoice is already paid.',
	invoiceAlreadyOverdue: 'This invoice is already overdue.',
	invoiceAlreadyCanceled: 'This invoice is already canceled.',
	invoiceNotFound: 'Invoice {invoiceId:string} not found.',

	// Subscription
	subscriptionAlreadyTrial: 'This subscription is already in trial.',
	subscriptionAlreadyActive: 'This subscription is already active.',
	subscriptionAlreadyOverdue: 'This subscription is already overdue.',
	subscriptionAlreadyCanceled: 'This subscription is already canceled.',
	subscriptionNotFound: 'Subscription {subscriptionId:string} not found.',

	// OTP
	otpNotFound: 'OTP {otpId:string} not found.',
	otpContextNotFound: 'OTP context {context:string} not found.',
	otpInvalidRecipient: 'Invalid OTP recipient.',
	otpInvalidContext: 'Invalid OTP context.',
	otpInvalidCode: 'Invalid OTP code.',
	otpExpired: 'OTP expired.',
	otpAttemptsExceeded: 'OTP validation attempts exceeded.',
	otpResendCooldown: 'OTP insufficient resend time, please try again later.',
	otpDailyLimitExceeded: 'OTP daily request limit exceeded.',

	// Permission
	permissionNotFound: 'Permission {permissionId:string} not found.',
	permissionIdsNotFound:
		'The following permissions were not found: {permissionIds:string[]}.',
} as const

type Translations = {
	[K in keyof typeof en]: string
}

const es: Translations = {
	// User
	userAlreadyHasWorkspace: 'El usuario ya tiene un workspace.',
	userAlreadyOnboarding: 'Este usuario ya está en proceso de incorporación.',
	userAlreadyActive: 'Este usuario ya está activo.',
	userAlreadyInactive: 'Este usuario ya está inactivo.',
	userNotFound: 'El usuario {userId:string} no existe.',

	// Workspace
	workspaceAlreadyTrial: 'Este workspace ya está en período de prueba.',
	workspaceAlreadyActive: 'Este workspace ya está activo.',
	workspaceAlreadyInactive: 'Este workspace ya está inactivo.',
	workspaceNotFound: 'El workspace {workspaceId:string} no existe.',

	// Organization
	organizationAlreadyActive: 'Esta organización ya está activa.',
	organizationAlreadyInactive: 'Esta organización ya está inactiva.',
	organizationNotFound: 'La organización {organizationId:string} no existe.',

	// Plan
	planAlreadyActive: 'Este plan ya está activo.',
	planAlreadyInactive: 'Este plan ya está inactivo.',
	planNotFound: 'El plan {planId:string} no existe.',

	// Role
	roleAlreadyActive: 'Este rol ya está activo.',
	roleAlreadyInactive: 'Este rol ya está inactivo.',
	roleNotFound: 'El rol {roleId:string} no existe.',
	roleIdsNotFound: 'Los siguientes roles no existen: {roleIds:string[]}.',

	// Invoice
	invoiceAlreadyPending: 'Esta factura ya está pendiente.',
	invoiceAlreadyPaid: 'Esta factura ya está pagada.',
	invoiceAlreadyOverdue: 'Esta factura ya está vencida.',
	invoiceAlreadyCanceled: 'Esta factura ya está cancelada.',
	invoiceNotFound: 'La factura {invoiceId:string} no existe.',

	// Subscription
	subscriptionAlreadyTrial: 'Esta suscripción ya está en período de prueba.',
	subscriptionAlreadyActive: 'Esta suscripción ya está activa.',
	subscriptionAlreadyOverdue: 'Esta suscripción ya está vencida.',
	subscriptionAlreadyCanceled: 'Esta suscripción ya está cancelada.',
	subscriptionNotFound: 'La suscripción {subscriptionId:string} no existe.',

	// OTP
	otpNotFound: 'El OTP {otpId:string} no existe.',
	otpContextNotFound: 'El contexto OTP {context:string} no existe.',
	otpInvalidRecipient: 'Destinatario del OTP inválido.',
	otpInvalidContext: 'Contexto del OTP inválido.',
	otpInvalidCode: 'Código OTP inválido.',
	otpExpired: 'El OTP ha expirado.',
	otpAttemptsExceeded:
		'Se superó el número máximo de intentos de validación del OTP.',
	otpResendCooldown:
		'Tiempo de reenvío insuficiente, inténtelo de nuevo más tarde.',
	otpDailyLimitExceeded:
		'Se ha superado el límite diario de solicitudes de OTP.',

	// Permission
	permissionNotFound: 'El permiso {permissionId:string} no existe.',
	permissionIdsNotFound:
		'Los siguientes permisos no existen: {permissionIds:string[]}.',
}

const ptBR: Translations = {
	// User
	userAlreadyHasWorkspace: 'Já existe um workspace para este usuário.',
	userAlreadyOnboarding: 'Este usuário já está em processo de cadastro.',
	userAlreadyActive: 'Este usuário já está ativo.',
	userAlreadyInactive: 'Este usuário já está inativo.',
	userNotFound: 'O usuário {userId:string} não existe.',

	// Workspace
	workspaceAlreadyTrial: 'Este workspace já está em período de teste.',
	workspaceAlreadyActive: 'Este workspace já está ativo.',
	workspaceAlreadyInactive: 'Este workspace já está inativo.',
	workspaceNotFound: 'O workspace {workspaceId:string} não existe.',

	// Organization
	organizationAlreadyActive: 'Esta organização já está ativa.',
	organizationAlreadyInactive: 'Esta organização já está inativa.',
	organizationNotFound: 'A organização {organizationId:string} não existe.',

	// Plan
	planAlreadyActive: 'Este plano já está ativo.',
	planAlreadyInactive: 'Este plano já está inativo.',
	planNotFound: 'O plano {planId:string} não existe.',

	// Role
	roleAlreadyActive: 'Este papel já está ativo.',
	roleAlreadyInactive: 'Este papel já está inativo.',
	roleNotFound: 'O papel {roleId:string} não existe.',
	roleIdsNotFound: 'Os seguintes papéis não existem: {roleIds:string[]}.',

	// Invoice
	invoiceAlreadyPending: 'Esta fatura já está pendente.',
	invoiceAlreadyPaid: 'Esta fatura já está paga.',
	invoiceAlreadyOverdue: 'Esta fatura já está vencida.',
	invoiceAlreadyCanceled: 'Esta fatura já está cancelada.',
	invoiceNotFound: 'A fatura {invoiceId:string} não existe.',

	// Subscription
	subscriptionAlreadyTrial: 'Esta assinatura já está em período de teste.',
	subscriptionAlreadyActive: 'Esta assinatura já está ativa.',
	subscriptionAlreadyOverdue: 'Esta assinatura já está vencida.',
	subscriptionAlreadyCanceled: 'Esta assinatura já está cancelada.',
	subscriptionNotFound: 'A assinatura {subscriptionId:string} não existe.',

	// OTP
	otpNotFound: 'O OTP {otpId:string} não existe.',
	otpContextNotFound: 'O contexto OTP {context:string} não existe.',
	otpInvalidRecipient: 'Destinatário do OTP inválido.',
	otpInvalidContext: 'Contexto do OTP inválido.',
	otpInvalidCode: 'Código OTP inválido.',
	otpExpired: 'O OTP expirou.',
	otpAttemptsExceeded:
		'Número máximo de tentativas de validação do OTP excedido.',
	otpResendCooldown:
		'Tempo insuficiente para reenviar o OTP, tente novamente mais tarde.',
	otpDailyLimitExceeded: 'Limite diário de solicitações de OTP excedido.',

	// Permission
	permissionNotFound: 'A permissão {permissionId:string} não existe.',
	permissionIdsNotFound:
		'Os seguintes permissões não existem: {permissionIds:string[]}.',
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
