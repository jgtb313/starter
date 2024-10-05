import { describe, expect, it, beforeEach } from 'vitest'
import { z } from '@starter/schema'
import { uuid } from '@starter/shared'

import { TestDependencies, ITestDependencies } from '@/config/tests'
import { IDependencies, IUseCaseExecute } from '@/core/shared/types'

import { createUseCase, setupDomain, SetupDomain } from './utilities'

describe('utilities', () => {
  let dependencies: ITestDependencies

  beforeEach(() => {
    dependencies = TestDependencies()
  })

  describe('createUseCase', () => {
    const schema = z.object({
      name: z.string(),
      email: z.string().email()
    })

    type Input = z.infer<typeof schema>
    type Output = Input & {
      id: string
    }

    const execute: IUseCaseExecute<Input, Output> = () => async (input) => {
      return {
        ...input,
        id: uuid()
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

  describe('setupDomain', () => {
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      updatedAt: z.date()
    })

    type Input = z.infer<typeof schema>

    it('should generated ID and timestamps', () => {
      const input: SetupDomain<Input> = { name: 'John Doe', email: 'john@example.com' }

      const result = setupDomain(input, schema)

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('createdAt')
      expect(result).toHaveProperty('updatedAt')
    })

    it('should throw a ZodError if validation fails', () => {
      const invalidValue = { name: 'John Doe', email: 'invalid-email' }

      expect(() => setupDomain(invalidValue, schema)).toThrow(z.ZodError)
    })
  })
})
