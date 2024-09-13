import { createEnumOptions } from '@/support'

export enum BatchInvoicesFileStatusEnum {
  'SAVED' = 'SAVED',
  'ALREADY_SAVED' = 'ALREADY_SAVED',
  'PROCESSING' = 'PROCESSING',
  'ERROR' = 'ERROR'
}

export enum BatchInvoicesStatusEnum {
  'ALL_SAVED' = 'ALL_SAVED',
  'ALL_PREVIOUSLY_SAVED' = 'ALL_PREVIOUSLY_SAVED',
  'PARTIAL_SAVED' = 'PARTIAL_SAVED',
  'NONE' = 'NONE'
}

export enum InvoiceStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const InvoiceStatus = createEnumOptions<InvoiceStatusEnum>([
  {
    label: 'Ativo',
    value: InvoiceStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: InvoiceStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: InvoiceStatusEnum.DELETED
  }
])
