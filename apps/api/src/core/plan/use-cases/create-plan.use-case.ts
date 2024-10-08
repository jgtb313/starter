import { CreatePlanSchema, CreatePlanInput, CreatePlanOutput, PlanStatusEnum } from '@starter/schema'
import { uuid } from '@starter/shared'

import { createUseCase } from '@/support/utilities'
import { IUseCaseExecute } from '@/core/shared/types'
import { Plan } from '@/core/plan/domain'

const execute: IUseCaseExecute<CreatePlanInput, CreatePlanOutput> =
  ({ Repositories }) =>
  async ({ name, amount, interval, intervalCount, features }) => {
    const integrationId = uuid()

    const plan = await Repositories.plan.create(
      new Plan({ integrationId, name, amount, interval, intervalCount, features, status: PlanStatusEnum.INACTIVE }),
    )

    return plan.state
  }

export const createPlan = createUseCase(execute, CreatePlanSchema)
