// import { isString } from '@starter/common'

const isString = (value: any): value is string => typeof value === 'string'

export type WithWorkspaceReference<T extends string> =
	| string
	| ({ [key in T]: string } & {
			workspaceId?: string
	  })

export const createWorkspaceReference =
	<T extends string>(key: T) =>
	(reference: WithWorkspaceReference<T>) =>
		isString(reference)
			? {
					[key]: reference,
				}
			: reference
