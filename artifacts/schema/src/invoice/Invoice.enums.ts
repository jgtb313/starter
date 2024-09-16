import { createEnumOptions } from '@/support'

export enum InvoiceStatusEnum {
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  PAID = 'PAID',
  SCHEDULED = 'SCHEDULED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED'
}

export const InvoiceStatus = createEnumOptions<InvoiceStatusEnum>([
  {
    label: 'Esperando pagamento',
    value: InvoiceStatusEnum.WAITING_PAYMENT
  },
  {
    label: 'Pago',
    value: InvoiceStatusEnum.PAID
  },
  {
    label: 'Agendado',
    value: InvoiceStatusEnum.SCHEDULED
  },
  {
    label: 'Falha',
    value: InvoiceStatusEnum.FAILED
  },
  {
    label: 'Cancelado',
    value: InvoiceStatusEnum.CANCELED
  }
])
