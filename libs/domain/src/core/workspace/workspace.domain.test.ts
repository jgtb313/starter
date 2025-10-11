import { ConflictException } from '@starter/nestjs-error-handling'
import { describe, expect, it } from 'vitest'

import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import { makeWorkspace } from '@/core/workspace/workspace.mock'

describe('WorkspaceDomain', () => {
	it('should return true for isTrial when status is TRIAL', () => {
		const workspace = makeWorkspace({
			status: 'TRIAL',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isTrial()).toBe(true)
	})

	it('should return false for isTrial when status is ACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'ACTIVE',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isTrial()).toBe(false)
	})

	it('should return true for isActive when status is ACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'ACTIVE',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isActive()).toBe(true)
	})

	it('should return false for isActive when status is INACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'INACTIVE',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isActive()).toBe(false)
	})

	it('should return true for isInactive when status is INACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'INACTIVE',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isInactive()).toBe(true)
	})

	it('should return false for isInactive when status is ACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'ACTIVE',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isInactive()).toBe(false)
	})

	it('should return true for isTrialEnded when trialEndsAt is in the past', () => {
		const workspace = makeWorkspace({
			trialEndsAt: new Date(Date.now() - 1000).toISOString(),
			status: 'TRIAL',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isTrialEnded()).toBe(true)
	})

	it('should return false for isTrialEnded when trialEndsAt is in the future', () => {
		const workspace = makeWorkspace({
			trialEndsAt: new Date(Date.now() + 1000 * 60).toISOString(),
			status: 'TRIAL',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isTrialEnded()).toBe(false)
	})

	it('should throw when marking workspace as inactive if already inactive', () => {
		const workspace = makeWorkspace({
			status: 'INACTIVE',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(() => domain.checkIfCanDeactivate()).toThrowError(ConflictException)
	})

	it('should return true for isTrialEnded when trialEndsAt is in the past', () => {
		const workspace = makeWorkspace({
			trialEndsAt: new Date(Date.now() - 1000).toISOString(),
			status: 'TRIAL',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isTrialEnded()).toBe(true)
	})

	it('should return false for isTrialEnded when trialEndsAt is in the future', () => {
		const workspace = makeWorkspace({
			trialEndsAt: new Date(Date.now() + 1000 * 60).toISOString(),
			status: 'TRIAL',
		})
		const domain = new WorkspaceDomain(workspace)

		expect(domain.isTrialEnded()).toBe(false)
	})
})
