import { Injectable, Inject } from '@nestjs/common'
import { uuid } from '@starter/common'
import Stripe from 'stripe'

import { IRecurrenceAdapter, RecurrenceCreateSubscriptionOutput, RecurrenceIntervalEnum, RecurrencePaymentMethodEnum } from '@/ports/recurrence'
import { InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

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

  createSubscription: IRecurrenceAdapter['createSubscription'] = async ({ referenceId, planId, customerId, ...input }) => {
    let paymentMethod: Stripe.PaymentMethod

    if (input.paymentMethod === RecurrencePaymentMethodEnum.CREDIT_CARD) {
      const [expMonth, expYear] = input.creditCard.expirationDate.split('/').map(Number)

      paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: input.creditCard.number,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: input.creditCard.cvv,
        },
      })
    } else if (input.paymentMethod === RecurrencePaymentMethodEnum.DEBIT_CARD) {
      const [expMonth, expYear] = input.debitCard.expirationDate.split('/').map(Number)

      paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: input.debitCard.number,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: input.debitCard.cvv,
        },
      })
    } else if (input.paymentMethod === RecurrencePaymentMethodEnum.PIX) {
      paymentMethod = await this.stripe.paymentMethods.create({
        type: 'pix',
        pix: {},
      })
    } else if (input.paymentMethod === RecurrencePaymentMethodEnum.BOLETO) {
      paymentMethod = await this.stripe.paymentMethods.create({
        type: 'boleto',
        boleto: {
          tax_id: '',
        },
      })
    }

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
      paymentMethod: input.paymentMethod,
      dueDate: new Date(),
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

  cancelSubscription: IRecurrenceAdapter['cancelSubscription'] = async ({ subscriptionId }) => {
    await this.stripe.subscriptions.cancel(subscriptionId)

    return
  }

  private parsePlanInterval(interval: RecurrenceIntervalEnum): Stripe.PlanCreateParams.Interval {
    const values: Record<RecurrenceIntervalEnum, Stripe.PlanCreateParams.Interval> = {
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
