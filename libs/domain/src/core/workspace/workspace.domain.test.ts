import { describe, expect, it } from 'vitest'

import { makeWorkspace } from '@/core/workspace/workspace.mock'

describe('WorkspaceDomain', () => {
	it('should render domain correctly', () => {
		const workspace = makeWorkspace({})

		expect(workspace.state).toBeDefined()
	})
})
