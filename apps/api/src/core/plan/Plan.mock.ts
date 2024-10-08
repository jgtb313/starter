import { PlanIntervalEnum, PlanStatusEnum } from '@starter/schema'
import { uuid } from '@starter/shared'

import { Plan } from '@/core/plan/domain'

export const planMocks: Plan[] = [
  new Plan({
    id: 'rNrKYTX9g7z3RgJRmxWuGHbeu',
    integrationId: uuid(),
    name: 'Basic Plan',
    amount: 1000,
    interval: PlanIntervalEnum.MONTH,
    intervalCount: 1,
    features: [
      { description: 'Access to basic features', code: 'BASIC_FEATURES' },
      { description: 'Limited support', code: 'LIMITED_SUPPORT' },
    ],
    status: PlanStatusEnum.ACTIVE,
    deletedAt: null,
  }),

  new Plan({
    id: 'rNrKYTX9g7z3RgJRmxWuGHzxc',
    integrationId: uuid(),
    name: 'Pro Plan',
    amount: 2500,
    interval: PlanIntervalEnum.YEAR,
    intervalCount: 1,
    features: [
      { description: 'Access to pro features', code: 'PRO_FEATURES' },
      { description: 'Priority support', code: 'PRIORITY_SUPPORT' },
    ],
    deletedAt: null,
    status: PlanStatusEnum.ACTIVE,
  }),

  new Plan({
    id: 'rNrKYTX9g7z3RgJRmxWuGHnzq',
    integrationId: uuid(),
    name: 'Enterprise Plan',
    amount: 5000,
    interval: PlanIntervalEnum.MONTH,
    intervalCount: 3,
    features: [
      { description: 'Access to all features', code: 'ALL_FEATURES' },
      { description: 'Dedicated support', code: 'DEDICATED_SUPPORT' },
    ],
    deletedAt: null,
    status: PlanStatusEnum.INACTIVE,
  }),

  new Plan({
    id: 'rNrKYTX9g7z3RgJRmxWuGHeqw',
    integrationId: uuid(),
    name: 'Trial Plan',
    amount: 1500,
    interval: PlanIntervalEnum.DAY,
    intervalCount: 7,
    features: [{ description: 'Access to trial features', code: 'TRIAL_FEATURES' }],
    deletedAt: new Date('2023-12-31T00:00:00Z'),
    status: PlanStatusEnum.DELETED,
  }),
]
