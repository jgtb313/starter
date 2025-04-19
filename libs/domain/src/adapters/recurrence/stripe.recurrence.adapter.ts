import { Inject, Injectable } from '@nestjs/common'
import { uuid } from '@starter/common'
import Stripe from 'stripe'

import { IRecurrenceAdapter, RecurrenceCreateSubscriptionOutput } from '@/ports/recurrence'
import { PlanIntervalEnum } from '@/core/plan/plan.schema'
import { InvoicePaymentMethodEnum, InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

@Injectable()
export class StripeRecurrenceAdapter implements IRecurrenceAdapter {
  constructor(@Inject('STRIPE_CLIENT') private readonly stripe: Stripe) {}

  createPlan: IRecurrenceAdapter['createPlan'] = async ({ referenceId, name, description, amount, interval, intervalCount, trialDays }) => {
    const plan = await this.stripe.plans.create({
      currency: 'brl',
      nickname: name,
      amount,
      interval: this.parsePlanInterval(interval),
      interval_count: intervalCount,
      trial_period_days: trialDays,
      product: {
        name,
        statement_descriptor: description,
      },
      metadata: {
        referenceId,
      },
    })

    return {
      planId: plan.id,
    }
  }

  updatePlan: IRecurrenceAdapter['updatePlan'] = async ({ planId, name, description, trialDays }) => {
    const plan = await this.stripe.plans.retrieve(planId)

    await this.stripe.plans.update(planId, {
      nickname: name,
      trial_period_days: trialDays,
    })

    const productId = typeof plan.product === 'string' ? plan.product : (plan.product as Stripe.Product).id

    await this.stripe.products.update(productId, {
      name,
      description,
      statement_descriptor: description,
    })

    return
  }

  cancelPlan: IRecurrenceAdapter['cancelPlan'] = async ({ planId }) => {
    await this.stripe.plans.del(planId)

    return
  }

  createSubscription: IRecurrenceAdapter['createSubscription'] = async ({
    referenceId,
    planId,
    customerId,
    paymentMethod,
    payer,
    creditCard,
    debitCard,
  }) => {
    const paymentMethodd = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2025,
        cvc: '123',
      },
    })

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: planId }],
      collection_method: 'charge_automatically',
      payment_behavior: 'default_incomplete',
      metadata: { referenceId },
      expand: ['latest_invoice.payment_intent'],
      trial_from_plan: true,
    })

    const latestInvoice = subscription.latest_invoice as Stripe.Invoice

    const invoice: RecurrenceCreateSubscriptionOutput['invoice'] = {
      externalId: `${latestInvoice.id}`,
      amount: latestInvoice.amount_due,
      paymentMethod: paymentMethod as unknown as InvoicePaymentMethodEnum,
      billingDueDate: new Date(),
      status: this.parseInvoiceStatus(latestInvoice.status),
    }

    return {
      subscriptionId: subscription.id,
      invoice,
    }
  }

  changeSubscriptionPaymentMethod: IRecurrenceAdapter['changeSubscriptionPaymentMethod'] = async () => {
    const subscriptionId = uuid()

    return {
      subscriptionId,
    }
  }

  changeSubscriptionPlan: IRecurrenceAdapter['changeSubscriptionPlan'] = async () => {
    const subscriptionId = uuid()

    return {
      subscriptionId,
    }
  }

  cancelSubscription: IRecurrenceAdapter['cancelSubscription'] = async () => {
    return
  }

  private parsePlanInterval(interval: PlanIntervalEnum): Stripe.PlanCreateParams.Interval {
    const values: Record<PlanIntervalEnum, Stripe.PlanCreateParams.Interval> = {
      DAY: 'day',
      WEEK: 'week',
      MONTH: 'month',
      YEAR: 'year',
    }

    return values[interval]
  }

  private parseInvoiceStatus(status: Stripe.Invoice.Status | null): InvoiceStatusEnum {
    if (!status) {
      return InvoiceStatusEnum.PENDING
    }

    const values: Record<Stripe.Invoice.Status, InvoiceStatusEnum> = {
      draft: InvoiceStatusEnum.PENDING,
      open: InvoiceStatusEnum.PENDING,
      paid: InvoiceStatusEnum.PAID,
      uncollectible: InvoiceStatusEnum.OVERDUE,
      void: InvoiceStatusEnum.CANCELED,
    }

    return values[status]
  }
}
