import { Inject, Injectable } from '@nestjs/common'

import type { IRecurrenceAdapter } from '@/adapters/recurrence/recurrence.adapter'
import type { IRecurrence } from '@/ports/recurrence'

export const RecurrenceServiceSymbol = Symbol('RecurrenceService')

@Injectable()
export class RecurrenceService implements IRecurrence {
	constructor(
		@Inject(RecurrenceServiceSymbol)
		private readonly recurrence: IRecurrenceAdapter,
	) {}

	createPlan: IRecurrence['createPlan'] = async (input) => {
		return this.recurrence.createPlan(input)
	}

	updatePlan: IRecurrence['updatePlan'] = async (planId, input) => {
		return this.recurrence.updatePlan(planId, input)
	}

	cancelPlan: IRecurrence['cancelPlan'] = async (input) => {
		return this.recurrence.cancelPlan(input)
	}

	createCustmer: IRecurrence['createCustmer'] = async (input) => {
		return this.recurrence.createCustmer(input)
	}

	getUpcomingInvoice: IRecurrence['getUpcomingInvoice'] = async (input) => {
		return this.recurrence.getUpcomingInvoice(input)
	}

	createSubscription: IRecurrence['createSubscription'] = async (input) => {
		return this.recurrence.createSubscription(input)
	}

	changeSubscriptionPaymentMethod: IRecurrence['changeSubscriptionPaymentMethod'] =
		async (input) => {
			return this.recurrence.changeSubscriptionPaymentMethod(input)
		}

	changeSubscriptionPlan: IRecurrence['changeSubscriptionPlan'] = async (
		input,
	) => {
		return this.recurrence.changeSubscriptionPlan(input)
	}

	cancelSubscription: IRecurrence['cancelSubscription'] = async (input) => {
		return this.recurrence.cancelSubscription(input)
	}
}
