import { z } from '@/zod'

import { createEnumOptions } from '@/support'

export enum WeekEnum {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export const Week = createEnumOptions<WeekEnum, { weekened: boolean }>([
  {
    label: 'Segunda-feira',
    value: WeekEnum.MONDAY,
    metadata: {
      weekened: false
    }
  },
  {
    label: 'Terça-feira',
    value: WeekEnum.TUESDAY,
    metadata: {
      weekened: false
    }
  },
  {
    label: 'Quarta-feira',
    value: WeekEnum.WEDNESDAY,
    metadata: {
      weekened: false
    }
  },
  {
    label: 'Quinta-feira',
    value: WeekEnum.THURSDAY,
    metadata: {
      weekened: false
    }
  },
  {
    label: 'Sexta-feira',
    value: WeekEnum.FRIDAY,
    metadata: {
      weekened: false
    }
  },
  {
    label: 'Sábado',
    value: WeekEnum.SATURDAY,
    metadata: {
      weekened: true
    }
  },
  {
    label: 'Domingo',
    value: WeekEnum.SUNDAY,
    metadata: {
      weekened: true
    }
  }
])

export const WeekSchema = z.nativeEnum(WeekEnum)
