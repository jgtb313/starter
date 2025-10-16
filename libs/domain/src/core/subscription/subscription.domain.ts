import { ConflictException } from '@starter/nestjs-error-handling'

import { BaseDomain } from '@/support/base-domain'
import {
	type Subscription,
	SubscriptionSchema,
} from '@/core/subscription/subscription.schema'

export class SubscriptionDomain extends BaseDomain<Subscription> {
	constructor(subscription: Subscription) {
		super(SubscriptionSchema, subscription)
	}

	isTrial() {
		return this.state.status === 'TRIAL'
	}

	isActive() {
		return this.state.status === 'ACTIVE'
	}

	isOverdue() {
		return this.state.status === 'OVERDUE'
	}

	isCanceled() {
		return this.state.status === 'CANCELED'
	}

	checkIfCanActivate() {
		if (this.isActive()) {
			throw new ConflictException(
				this.i18nService.current.subscriptionAlreadyActive(),
			)
		}
	}

	checkIfCanCancel() {
		if (this.isCanceled()) {
			throw new ConflictException(
				this.i18nService.current.subscriptionAlreadyCanceled(),
			)
		}
	}

	checkIfCanMarkAsOverdue() {
		if (this.isOverdue()) {
			throw new ConflictException(
				this.i18nService.current.subscriptionAlreadyOverdue(),
			)
		}
		if (this.isCanceled()) {
			throw new ConflictException(
				this.i18nService.current.subscriptionAlreadyCanceled(),
			)
		}
	}

	checkIfCanMarkAsTrial() {
		if (this.isTrial()) {
			throw new ConflictException(
				this.i18nService.current.subscriptionAlreadyTrial(),
			)
		}
	}
}
