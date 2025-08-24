import { ConflictException } from '@starter/nestjs-error-handling'
import { describe, expect, it } from 'vitest'

import { makeWorkspace } from '@/core/workspace/workspace.mock'
import { WorkspaceStatusEnum } from '@/core/workspace/workspace.schema'

describe('WorkspaceDomain', () => {
	it('should return true for isActive when status is ACTIVE', () => {
		const workspace = makeWorkspace({
			status: WorkspaceStatusEnum.ACTIVE,
		})
		expect(workspace.isActive()).toBe(true)
	})

	it('should return false for isActive when status is INACTIVE', () => {
		const workspace = makeWorkspace({
			status: WorkspaceStatusEnum.INACTIVE,
		})
		expect(workspace.isActive()).toBe(false)
	})

	it('should return true for isInactive when status is INACTIVE', () => {
		const workspace = makeWorkspace({
			status: WorkspaceStatusEnum.INACTIVE,
		})
		expect(workspace.isInactive()).toBe(true)
	})

	it('should return false for isInactive when status is ACTIVE', () => {
		const workspace = makeWorkspace({
			status: WorkspaceStatusEnum.ACTIVE,
		})
		expect(workspace.isInactive()).toBe(false)
	})

	it('should allow marking workspace as active when inactive', () => {
		const workspace = makeWorkspace({
			status: WorkspaceStatusEnum.INACTIVE,
		})
		workspace.markAsActive()
		expect(workspace.isActive()).toBe(true)
	})

	it('should throw when marking workspace as active if already active', () => {
		const workspace = makeWorkspace({
			status: WorkspaceStatusEnum.ACTIVE,
		})
		expect(() => workspace.markAsActive()).toThrowError(
			new ConflictException('This workspace is already active.'),
		)
	})

	it('should allow marking workspace as inactive when active', () => {
		const workspace = makeWorkspace({
			status: WorkspaceStatusEnum.ACTIVE,
		})
		workspace.markAsInactive()
		expect(workspace.isInactive()).toBe(true)
	})

	it('should throw when marking workspace as inactive if already inactive', () => {
		const workspace = makeWorkspace({
			status: WorkspaceStatusEnum.INACTIVE,
		})
		expect(() => workspace.markAsInactive()).toThrowError(
			new ConflictException('This workspace is already inactive.'),
		)
	})
})
