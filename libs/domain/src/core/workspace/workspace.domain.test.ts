import { Test, type TestingModule } from '@nestjs/testing'
import { ConflictException } from '@starter/nestjs-error-handling'
import { beforeEach, describe, expect, it } from 'vitest'

import { WorkspaceDomain } from '@/core/workspace/workspace.domain'
import { makeWorkspace } from '@/core/workspace/workspace.mock'
import { I18nDomainModule } from '@/domain.i18n.module'
import { DomainFactory } from '@/support/base-domain'

describe('WorkspaceDomain', () => {
	let domainFactory: DomainFactory

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				I18nDomainModule.register(),
			],
			providers: [
				DomainFactory,
			],
		}).compile()

		domainFactory = module.get<DomainFactory>(DomainFactory)
	})

	it('should return true for isTrial when status is TRIAL', () => {
		const workspace = makeWorkspace({
			status: 'TRIAL',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isTrial()).toBe(true)
	})

	it('should return false for isTrial when status is ACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'ACTIVE',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isTrial()).toBe(false)
	})

	it('should return true for isActive when status is ACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'ACTIVE',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isActive()).toBe(true)
	})

	it('should return false for isActive when status is INACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'INACTIVE',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isActive()).toBe(false)
	})

	it('should return true for isInactive when status is INACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'INACTIVE',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isInactive()).toBe(true)
	})

	it('should return false for isInactive when status is ACTIVE', () => {
		const workspace = makeWorkspace({
			status: 'ACTIVE',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isInactive()).toBe(false)
	})

	it('should return true for isTrialEnded when trialEndsAt is in the past', () => {
		const workspace = makeWorkspace({
			trialEndsAt: new Date(Date.now() - 1000).toISOString(),
			status: 'TRIAL',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isTrialEnded()).toBe(true)
	})

	it('should return false for isTrialEnded when trialEndsAt is in the future', () => {
		const workspace = makeWorkspace({
			trialEndsAt: new Date(Date.now() + 1000 * 60).toISOString(),
			status: 'TRIAL',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isTrialEnded()).toBe(false)
	})

	it('should allow marking workspace as active when inactive', () => {
		const workspace = makeWorkspace({
			status: 'INACTIVE',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		domain.markAsActive()

		expect(domain.isActive()).toBe(true)
	})

	it('should throw when marking workspace as active if already active', () => {
		const workspace = makeWorkspace({
			status: 'ACTIVE',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(() => domain.markAsActive()).toThrowError(ConflictException)
	})

	it('should allow marking workspace as inactive when active', () => {
		const workspace = makeWorkspace({
			status: 'ACTIVE',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		domain.markAsInactive()

		expect(domain.isInactive()).toBe(true)
	})

	it('should throw when marking workspace as inactive if already inactive', () => {
		const workspace = makeWorkspace({
			status: 'INACTIVE',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(() => domain.markAsInactive()).toThrowError(ConflictException)
	})

	it('should return true for isTrialEnded when trialEndsAt is in the past', () => {
		const workspace = makeWorkspace({
			trialEndsAt: new Date(Date.now() - 1000).toISOString(),
			status: 'TRIAL',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isTrialEnded()).toBe(true)
	})

	it('should return false for isTrialEnded when trialEndsAt is in the future', () => {
		const workspace = makeWorkspace({
			trialEndsAt: new Date(Date.now() + 1000 * 60).toISOString(),
			status: 'TRIAL',
		})
		const domain = domainFactory.create(WorkspaceDomain, workspace)

		expect(domain.isTrialEnded()).toBe(false)
	})
})
