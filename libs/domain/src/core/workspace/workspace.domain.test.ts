import { describe, expect, it } from 'vitest'

import { makeWorkspace } from '@/core/workspace/workspace.mock'

describe('WorkspaceDomain', () => {
	it('should render domain correctly', () => {
		const workspace = makeWorkspace({
			workspaceId: '0e6c34bb-5a5c-4b31-bfec-33ec3651d57f',
			name: 'Manea CED',
			email: 'manea@ced.com',
		})

		expect(workspace.state).toBeDefined()
	})
})
