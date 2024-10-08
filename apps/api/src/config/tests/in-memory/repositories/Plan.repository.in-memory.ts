import { vi } from 'vitest'
import { PaginationSchemaTransform, PlanStatusEnum } from '@starter/schema'

import { NotFoundError } from '@/support/errors'
import { Plan } from '@/core/plan/domain'
import { planMocks } from '@/core/plan/Plan.mock'
import { IPlanRepository } from '@/ports/database/modules/Plan.repository'

let plans: Record<string, Plan> = {}

export const PlanRepositoryInMemory: ReturnType<IPlanRepository> = {
  index: vi.fn(async ({ status }) => {
    return Object.values(plans)
      .filter((plan) => plan.state.status !== PlanStatusEnum.DELETED)
      .filter((plan) => {
        if (status) {
          return plan.state.status === status
        }

        return true
      })
      .map((plan) => new Plan(plan.state))
  }),

  find: vi.fn(async (data) => {
    const { offset, limit } = PaginationSchemaTransform.parse(data)

    const items = Object.values(plans).filter((plan) => plan.state.status !== PlanStatusEnum.DELETED)

    const total = items.length
    const start = offset
    const end = start + limit
    const values = items.slice(start, end).map((plan) => new Plan(plan.state))

    return {
      values,
      total,
    }
  }),

  findById: vi.fn(async (id) => {
    const plan = plans[id]

    if (!plan) {
      throw new NotFoundError(`Plan ${id} not found`)
    }

    if (plan.state.status === PlanStatusEnum.DELETED) {
      throw new NotFoundError(`Plan ${id} not found`)
    }

    return new Plan(plan.state)
  }),

  findOne: vi.fn(async () => {
    const plan = Object.values(plans)
      .filter((plan) => plan.state.status !== PlanStatusEnum.DELETED)
      .find((plan) => {
        return plan
      })

    if (!plan) {
      return
    }

    return new Plan(plan.state)
  }),

  create: vi.fn(async ({ state }) => {
    const plan = new Plan(state)

    plans[plan.state.id] = plan

    return PlanRepositoryInMemory.findById(plan.state.id)
  }),

  updateById: vi.fn(async (id, { state }) => {
    const plan = await PlanRepositoryInMemory.findById(id)

    plans[id] = new Plan({
      ...plan.state,
      ...state,
    })

    return PlanRepositoryInMemory.findById(id)
  }),

  deleteById: vi.fn(async (id) => {
    const plan = await PlanRepositoryInMemory.findById(id)

    plans[id] = new Plan({
      ...plan.state,
      status: PlanStatusEnum.DELETED,
    })

    return
  }),
}

export const clearPlanRepositoryInMemory = () => {
  plans = Object.fromEntries(planMocks.map((mock) => [mock.state.id, mock]))
}
