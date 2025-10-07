import type {
	BaseAddress,
	BaseBoleto,
	BasePaymentCard,
	BasePix,
	DocumentExplicit,
	Phone,
} from '@starter/schema'

export type RecurrenceIntervalEnum = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'

export type RecurrencePaymentMethodEnum = 'CARD' | 'PIX' | 'BOLETO'

export type RecurrenceCreatePlanInput = {
	referenceId: string
	name: string
	description?: string
	amount: number
	interval: RecurrenceIntervalEnum
	intervalCount: number
	trialDays?: number
}
export type RecurrenceCreatePlanOutput = {
	planId: string
}

export type RecurrenceUpdatePlanInput = {
	name: string
	description?: string
	amount: number
	interval: RecurrenceIntervalEnum
	intervalCount: number
	trialDays?: number
}
export type RecurrenceUpdatePlanOutput = void

export type RecurrenceCancelPlanInput = {
	planId: string
}
export type RecurrenceCancelPlanOutput = void

export type RecurrenceCreateCustomerInput = {
	workspaceId: string
	name: string
	email: string
}
export type RecurrenceCreateCustomerOutput = {
	customerId: string
}

type CardPayment = {
	paymentMethod: 'CARD'
	cardToken: string
}
type PixPayment = {
	paymentMethod: 'PIX'
}
type BoletoPayment = {
	paymentMethod: 'BOLETO'
}
type RecurrencePaymentMethodInput = CardPayment | PixPayment | BoletoPayment

type CardPaymentOutput = {
	paymentMethod: 'CARD'
	card: BasePaymentCard
}
type PixPaymentOutput = {
	paymentMethod: 'PIX'
	pix: BasePix
}
type BoletoPaymentOutput = {
	paymentMethod: 'BOLETO'
	boleto: BaseBoleto
}
type RecurrencePaymentMethodOutput =
	| CardPaymentOutput
	| PixPaymentOutput
	| BoletoPaymentOutput

export type RecurrenceCreateSubscriptionInput = {
	referenceId: string
	customerId: string
	planId: string
	payer: {
		name: string
		email: string
		phone: Phone
		document: DocumentExplicit
		address: BaseAddress
	}
} & RecurrencePaymentMethodInput
export type RecurrenceCreateSubscriptionOutput = {
	subscriptionId: string
} & RecurrencePaymentMethodOutput

export type RecurrenceChangeSubscriptionPaymentMethodInput = {
	subscriptionId: string
} & RecurrencePaymentMethodInput
export type RecurrenceChangeSubscriptionPaymentMethodOutput = {
	subscriptionId: string
} & RecurrencePaymentMethodOutput

export type RecurrenceChangeSubscriptionPlanInput = {
	subscriptionId: string
	planId: string
}
export type RecurrenceChangeSubscriptionPlanOutput = {
	subscriptionId: string
}

export type RecurrenceCancelSubscriptionInput = {
	subscriptionId: string
}
export type RecurrenceCancelSubscriptionOutput = void

export interface IRecurrenceAdapter {
	createPlan: (
		input: RecurrenceCreatePlanInput,
	) => Promise<RecurrenceCreatePlanOutput>
	updatePlan: (
		planId: string,
		input: RecurrenceUpdatePlanInput,
	) => Promise<RecurrenceUpdatePlanOutput>
	cancelPlan: (
		input: RecurrenceCancelPlanInput,
	) => Promise<RecurrenceCancelPlanOutput>

	createCustmer: (
		input: RecurrenceCreateCustomerInput,
	) => Promise<RecurrenceCreateCustomerOutput>

	createSubscription: (
		input: RecurrenceCreateSubscriptionInput,
	) => Promise<RecurrenceCreateSubscriptionOutput>
	changeSubscriptionPaymentMethod: (
		input: RecurrenceChangeSubscriptionPaymentMethodInput,
	) => Promise<RecurrenceChangeSubscriptionPaymentMethodOutput>
	changeSubscriptionPlan: (
		input: RecurrenceChangeSubscriptionPlanInput,
	) => Promise<RecurrenceChangeSubscriptionPlanOutput>
	cancelSubscription: (
		input: RecurrenceCancelSubscriptionInput,
	) => Promise<RecurrenceCancelSubscriptionOutput>
}
