import { Injectable } from '@nestjs/common'
import { uuid } from '@starter/common'
import { IRecurrenceAdapter, RecurrencePaymentMethodEnum } from '@/ports/recurrence'
import { InvoiceStatusEnum } from '@/core/invoice/invoice.schema'

@Injectable()
export class InMemoryRecurrenceAdapter implements IRecurrenceAdapter {
  createPlan: IRecurrenceAdapter['createPlan'] = async () => {
    return {
      planId: uuid(),
    }
  }

  updatePlan: IRecurrenceAdapter['updatePlan'] = async () => {
    return
  }

  cancelPlan: IRecurrenceAdapter['cancelPlan'] = async () => {
    return
  }

  createCustmer: IRecurrenceAdapter['createCustmer'] = async () => {
    return {
      customerId: uuid(),
    }
  }

  createSubscription: IRecurrenceAdapter['createSubscription'] = async (input) => {
    const subscriptionId = uuid()

    if (input.paymentMethod === RecurrencePaymentMethodEnum.CARD) {
      return {
        subscriptionId,
        paymentMethod: input.paymentMethod,
        invoice: {
          invoiceId: uuid(),
          amount: 1000,
          paymentMethod: input.paymentMethod,
          dueDate: new Date(),
          status: InvoiceStatusEnum.PENDING,
        },
        card: {
          token: input.cardToken,
          number: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
          holderName: input.payer.name,
          expirationDate: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${new Date().getFullYear() + 3}`,
        },
      }
    }

    if (input.paymentMethod === RecurrencePaymentMethodEnum.PIX) {
      return {
        subscriptionId,
        paymentMethod: input.paymentMethod,
        invoice: {
          invoiceId: uuid(),
          amount: 1000,
          paymentMethod: input.paymentMethod,
          dueDate: new Date(),
          status: InvoiceStatusEnum.PENDING,
        },
        pix: {
          qrCode: 'mocked-qr-code',
          dueDate: new Date(Date.now() + 3600_000),
        },
      }
    }

    return {
      subscriptionId,
      paymentMethod: input.paymentMethod,
      invoice: {
        invoiceId: uuid(),
        amount: 1000,
        paymentMethod: input.paymentMethod,
        dueDate: new Date(),
        status: InvoiceStatusEnum.PENDING,
      },
      boleto: {
        url: 'https://example.com/boleto.pdf',
        instructions: '',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    }
  }

  changeSubscriptionPaymentMethod: IRecurrenceAdapter['changeSubscriptionPaymentMethod'] = async ({ subscriptionId, ...input }) => {
    if (input.paymentMethod === RecurrencePaymentMethodEnum.CARD) {
      return {
        subscriptionId,
        paymentMethod: input.paymentMethod,
        card: {
          token: input.cardToken,
          number: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
          holderName: '',
          expirationDate: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${new Date().getFullYear() + 3}`,
        },
      }
    }

    if (input.paymentMethod === RecurrencePaymentMethodEnum.PIX) {
      return {
        subscriptionId,
        paymentMethod: input.paymentMethod,
        invoice: {
          invoiceId: uuid(),
          amount: 1000,
          paymentMethod: input.paymentMethod,
          dueDate: new Date(),
          status: InvoiceStatusEnum.PENDING,
        },
        pix: {
          qrCode: 'mocked-qr-code',
          dueDate: new Date(Date.now() + 3600_000),
        },
      }
    }

    return {
      subscriptionId,
      paymentMethod: input.paymentMethod,
      invoice: {
        invoiceId: uuid(),
        amount: 1000,
        paymentMethod: input.paymentMethod,
        dueDate: new Date(),
        status: InvoiceStatusEnum.PENDING,
      },
      boleto: {
        url: 'https://example.com/boleto.pdf',
        instructions: '',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    }
  }

  changeSubscriptionPlan: IRecurrenceAdapter['changeSubscriptionPlan'] = async ({ subscriptionId, planId }) => {
    return {
      subscriptionId,
      invoice: {
        externalId: uuid(),
        amount: 2000,
        paymentMethod: RecurrencePaymentMethodEnum.CARD,
        dueDate: new Date(),
        status: InvoiceStatusEnum.PENDING,
      },
    }
  }

  cancelSubscription: IRecurrenceAdapter['cancelSubscription'] = async () => {
    return
  }
}
