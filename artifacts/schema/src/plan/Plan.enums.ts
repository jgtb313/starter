import { createEnumOptions } from '@/support'

export enum PlanIntervalEnum {
  'DAY' = 'DAY',
  'WEEK' = 'WEEK',
  'MONTH' = 'MONTH',
  'YEAR' = 'YEAR'
}

export enum PlanStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export const PlanInterval = createEnumOptions<PlanIntervalEnum>([
  {
    label: 'Diário',
    value: PlanIntervalEnum.DAY
  },
  {
    label: 'Semanal',
    value: PlanIntervalEnum.WEEK
  },
  {
    label: 'Mensal',
    value: PlanIntervalEnum.MONTH
  },
  {
    label: 'Anual',
    value: PlanIntervalEnum.YEAR
  }
])

export const PlanStatus = createEnumOptions<PlanStatusEnum>([
  {
    label: 'Ativo',
    value: PlanStatusEnum.ACTIVE
  },
  {
    label: 'Inativo',
    value: PlanStatusEnum.INACTIVE
  },
  {
    label: 'Deletado',
    value: PlanStatusEnum.DELETED
  }
])
