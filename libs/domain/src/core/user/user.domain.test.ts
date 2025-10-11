import { describe, expect, it } from 'vitest'

import { makeUser } from '@/core/user/user.mock'

describe('UserDomain', () => {
	it('should return true for isOnboarding when status is ONBOARDING', () => {
		const user = makeUser({
			status: 'ONBOARDING',
		})
		expect(user.isOnboarding()).toBe(true)
	})

	it('should return false for isOnboarding when status is ACTIVE', () => {
		const user = makeUser({
			status: 'ACTIVE',
		})
		expect(user.isOnboarding()).toBe(false)
	})

	it('should return true for isActive when status is ACTIVE', () => {
		const user = makeUser({
			status: 'ACTIVE',
		})
		expect(user.isActive()).toBe(true)
	})

	it('should return false for isActive when status is INACTIVE', () => {
		const user = makeUser({
			status: 'INACTIVE',
		})
		expect(user.isActive()).toBe(false)
	})

	it('should return true for isInactive when status is INACTIVE', () => {
		const user = makeUser({
			status: 'INACTIVE',
		})
		expect(user.isInactive()).toBe(true)
	})

	it('should return false for isInactive when status is ACTIVE', () => {
		const user = makeUser({
			status: 'ACTIVE',
		})
		expect(user.isInactive()).toBe(false)
	})

	it('should throw when trying to mark user as active if already active', () => {
		const user = makeUser({
			status: 'ACTIVE',
		})

		const result = user.checkIfCanActivate()

		expect(result).toBe(false)
	})

	it('should throw when trying to mark user as inactive if already inactive', () => {
		const user = makeUser({
			status: 'INACTIVE',
		})

		const result = user.checkIfCanDeactivate()

		expect(result).toBe(false)
	})
})
