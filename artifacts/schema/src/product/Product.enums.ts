import { createEnumOptions } from '@/support'

export enum ProductStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const ProductStatus = createEnumOptions<ProductStatusEnum>([
  {
    label: 'Ativo',
    value: ProductStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: ProductStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: ProductStatusEnum.DELETED
  }
])
