import { createEnumOptions } from '@/support'

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
