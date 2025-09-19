import { ConflictException } from '@starter/nestjs-error-handling'
import { describe, expect, it } from 'vitest'

import { makeRole } from '@/core/role/role.mock'

describe('RoleDomain', () => {
	it('should return true for isActive when status is ACTIVE', () => {
		const role = makeRole({
			status: 'ACTIVE',
		})
		expect(role.isActive()).toBe(true)
	})

	it('should return false for isActive when status is INACTIVE', () => {
		const role = makeRole({
			status: 'INACTIVE',
		})
		expect(role.isActive()).toBe(false)
	})

	it('should return true for isInactive when status is INACTIVE', () => {
		const role = makeRole({
			status: 'INACTIVE',
		})
		expect(role.isInactive()).toBe(true)
	})

	it('should return false for isInactive when status is ACTIVE', () => {
		const role = makeRole({
			status: 'ACTIVE',
		})
		expect(role.isInactive()).toBe(false)
	})

	it('should allow marking role as active when inactive', () => {
		const role = makeRole({
			status: 'INACTIVE',
		})
		role.markAsActive()
		expect(role.isActive()).toBe(true)
	})

	it('should throw when marking role as active if already active', () => {
		const role = makeRole({
			status: 'ACTIVE',
		})
		expect(() => role.markAsActive()).toThrowError(
			new ConflictException('This role is already active.'),
		)
	})

	it('should allow marking role as inactive when active', () => {
		const role = makeRole({
			status: 'ACTIVE',
		})
		role.markAsInactive()
		expect(role.isInactive()).toBe(true)
	})

	it('should throw when marking role as inactive if already inactive', () => {
		const role = makeRole({
			status: 'INACTIVE',
		})
		expect(() => role.markAsInactive()).toThrowError(
			new ConflictException('This role is already inactive.'),
		)
	})
})
