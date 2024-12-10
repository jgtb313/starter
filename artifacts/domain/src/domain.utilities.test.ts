import { vi, describe, expect, it, beforeEach } from 'vitest'
import { z } from '@starter/schema'

import { createTestDependencies, ITestDependencies } from './domain.dependencies'
import { setupDomain, SetupDomain } from './domain.utilities'

describe('utilities', () => {
  let dependencies: ITestDependencies

  beforeEach(async () => {
    dependencies = await createTestDependencies(vi)
  })

  describe('setupDomain', () => {
    const schema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      updatedAt: z.date(),
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
