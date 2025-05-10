import { Injectable, Inject } from '@nestjs/common'
import { uuid } from '@starter/common'
import Stripe from 'stripe'

import { IRecurrenceAdapter, RecurrenceCreateSubscriptionOutput, RecurrenceIntervalEnum, RecurrencePaymentMethodEnum } from '@/ports/recurrence'
import { InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

@Injectable()
export class StripeRecurrenceAdapter implements IRecurrenceAdapter {
  constructor(@Inject('STRIPE_CLIENT') private readonly stripe: Stripe) {}

  createPlan: IRecurrenceAdapter['createPlan'] = async ({ workspaceId, name, description, amount, interval, intervalCount, trialDays }) => {
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
        workspaceId,
      },
    })

    return {
      planId: plan.id,
    }
  }

  updatePlan: IRecurrenceAdapter['updatePlan'] = async ({ planId, name, description, trialDays }) => {
    const plan = await this.stripe.plans.retrieve(planId)
    const productId = typeof plan.product === 'string' ? plan.product : (plan.product as Stripe.Product).id

    await Promise.all([
      this.stripe.plans.update(plan.id, {
        nickname: name,
        trial_period_days: trialDays,
      }),
      this.stripe.products.update(productId, {
        name,
        description,
        statement_descriptor: description,
      }),
    ])

    return
  }

  cancelPlan: IRecurrenceAdapter['cancelPlan'] = async ({ planId }) => {
    await this.stripe.plans.del(planId)

    return
  }

  createCustmer: IRecurrenceAdapter['createCustmer'] = async ({ workspaceId }) => {
    const stripeCustomer = await this.stripe.customers.create({
      metadata: {
        workspaceId,
      },
    })

    return {
      customerId: stripeCustomer.id,
    }
  }

  createSubscription: IRecurrenceAdapter['createSubscription'] = async ({ referenceId, planId, customerId, payer, ...input }) => {
    if (input.paymentMethod === RecurrencePaymentMethodEnum.CARD) {
      await Promise.all([
        this.stripe.paymentMethods.attach(input.cardToken, { customer: customerId }),
        this.stripe.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: input.cardToken,
          },
        }),
      ])
    }

    const stripeSubscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: planId }],
      collection_method: RecurrencePaymentMethodEnum.CARD ? 'charge_automatically' : 'send_invoice',
      payment_settings: {
        payment_method_types: [this.parsePaymentMethod(input.paymentMethod)],
        save_default_payment_method: input.paymentMethod === RecurrencePaymentMethodEnum.CARD ? 'on_subscription' : undefined,
      },
      metadata: {
        subscriptionId: referenceId,
      },
    })

    const stripeInvoice = (await this.stripe.invoices.retrieve(`${stripeSubscription.latest_invoice}`, {
      expand: ['payment_intent'],
    })) as unknown as Stripe.Invoice & {
      payment_intent: Stripe.PaymentIntent
    }

    const response: Pick<RecurrenceCreateSubscriptionOutput, 'subscriptionId' | 'invoice'> = {
      subscriptionId: stripeSubscription.id,
      invoice: {
        externalId: `${stripeInvoice.id}`,
        paymentMethod: input.paymentMethod,
        amount: stripeInvoice.amount_due,
        dueDate: new Date(),
        status: this.parseInvoiceStatus(stripeInvoice.status),
      },
    }

    const paymentIntent = stripeInvoice.payment_intent

    if (input.paymentMethod === RecurrencePaymentMethodEnum.CARD) {
      const paymentMethodDetails = await this.stripe.paymentMethods.retrieve(input.cardToken)

      const card = paymentMethodDetails.card as Stripe.PaymentMethod.Card

      return {
        ...response,
        paymentMethod: input.paymentMethod,
        card: {
          token: input.cardToken,
          number: `**** **** **** ${card.last4}`,
          holderName: `${paymentMethodDetails.billing_details.name}`,
          expirationDate: `${card.exp_month}/${card.exp_year}`,
        },
      }
    }

    if (input.paymentMethod === RecurrencePaymentMethodEnum.PIX) {
      const pixData = paymentIntent?.next_action?.pix_display_qr_code as Stripe.PaymentIntent.NextAction.PixDisplayQrCode

      return {
        ...response,
        paymentMethod: input.paymentMethod,
        pix: {
          qrCode: `${pixData.data}`,
          dueDate: new Date(pixData.expires_at as number),
        },
      }
    }

    const boletoData = paymentIntent?.next_action?.boleto_display_details as Stripe.PaymentIntent.NextAction.BoletoDisplayDetails

    return {
      ...response,
      paymentMethod: input.paymentMethod,
      boleto: {
        url: `${boletoData.hosted_voucher_url}`,
        dueDate: new Date(boletoData.expires_at as number),
        instructions: `${boletoData.pdf}`,
      },
    }
  }

  changeSubscriptionPaymentMethod: IRecurrenceAdapter['changeSubscriptionPaymentMethod'] = async ({ subscriptionId, ...input }) => {
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

  private parsePaymentMethod(paymentMethod: RecurrencePaymentMethodEnum) {
    const values: Record<RecurrencePaymentMethodEnum, Stripe.SubscriptionCreateParams.PaymentSettings.PaymentMethodType> = {
      CARD: 'card',
      BOLETO: 'boleto',
      PIX: 'paypal',
    }

    return values[paymentMethod]
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
