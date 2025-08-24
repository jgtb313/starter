import { ConflictException } from '@starter/nestjs-error-handling'
import { describe, expect, it } from 'vitest'

import { makeOrganization } from '@/core/organization/organization.mock'
import { OrganizationStatusEnum } from '@/core/organization/organization.schema'

describe('OrganizationDomain', () => {
	it('should return true for isActive when status is ACTIVE', () => {
		const organization = makeOrganization({
			status: OrganizationStatusEnum.ACTIVE,
		})
		expect(organization.isActive()).toBe(true)
	})

	it('should return false for isActive when status is INACTIVE', () => {
		const organization = makeOrganization({
			status: OrganizationStatusEnum.INACTIVE,
		})
		expect(organization.isActive()).toBe(false)
	})

	it('should return true for isInactive when status is INACTIVE', () => {
		const organization = makeOrganization({
			status: OrganizationStatusEnum.INACTIVE,
		})
		expect(organization.isInactive()).toBe(true)
	})

	it('should return false for isInactive when status is ACTIVE', () => {
		const organization = makeOrganization({
			status: OrganizationStatusEnum.ACTIVE,
		})
		expect(organization.isInactive()).toBe(false)
	})

	it('should allow marking organization as active when inactive', () => {
		const organization = makeOrganization({
			status: OrganizationStatusEnum.INACTIVE,
		})
		organization.markAsActive()
		expect(organization.isActive()).toBe(true)
	})

	it('should throw when marking organization as active if already active', () => {
		const organization = makeOrganization({
			status: OrganizationStatusEnum.ACTIVE,
		})
		expect(() => organization.markAsActive()).toThrowError(
			new ConflictException('This organization is already active.'),
		)
	})

	it('should allow marking organization as inactive when active', () => {
		const organization = makeOrganization({
			status: OrganizationStatusEnum.ACTIVE,
		})
		organization.markAsInactive()
		expect(organization.isInactive()).toBe(true)
	})

	it('should throw when marking organization as inactive if already inactive', () => {
		const organization = makeOrganization({
			status: OrganizationStatusEnum.INACTIVE,
		})
		expect(() => organization.markAsInactive()).toThrowError(
			new ConflictException('This organization is already inactive.'),
		)
	})
})
