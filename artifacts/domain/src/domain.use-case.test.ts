import { vi, describe, expect, it, beforeEach } from 'vitest'
import { z } from '@starter/schema'
import { uuid } from '@starter/shared'

import { createTestDependencies, IDependencies, ITestDependencies } from './domain.dependencies'
import { createUseCase, IUseCaseExecute } from './domain.use-case'

describe('utilities', () => {
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await createTestDependencies(vi)
  })

  describe('createUseCase', () => {
    const schema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    type Input = z.infer<typeof schema>
    type Output = Input & {
      id: string
    }

    const execute: IUseCaseExecute<Input, Output> = () => async (input) => {
      return {
        ...input,
        id: uuid(),
      }
    }

    it('should execute the use case without schema validation', async () => {
      const input: Input = { name: 'John Doe', email: 'john@example.com' }

      const result = await createUseCase(execute)(dependencies as IDependencies)(input)

      expect(result.id).toBeDefined()
    })

    it('should execute the use case with schema validation', async () => {
      const input: Input = { name: 'John Doe', email: 'john@example.com' }

      const result = await createUseCase(execute, schema)(dependencies as IDependencies)(input)

      expect(result.id).toBeDefined()
    })

    it('should throw an error if validation fails', () => {
      expect(() => createUseCase(execute, schema)(dependencies as IDependencies)({ name: 'John Doe', email: 'invalid-email' })).toThrow(z.ZodError)
    })
  })
})
